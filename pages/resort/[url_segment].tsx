import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { gql, ApolloError } from '@apollo/client';
import { initializeApollo } from '../../lib/apollo-client';
import ResortSingle from '@/ResortSingle/ResortSingle';
import { Resort } from '../../types/resortTypes';
import { QUERY_RESORTS_URL } from '../../hooks/useQueryResortsUrl';
import { MetaTags } from '../../components/MetaTags/MetaTags';
import { trackResortView, pageview } from '../../lib/gtag';

const QUERY_RESORT = gql`
  query ResortByURLSegment($url_segment: String!) {
    resortByUrlSegment(url_segment: $url_segment) {
      id
      title
      url_segment
      affiliate_url
      description
      resort_images {
        id
        name
        alt
        sort_order
        image {
          path
          content_type
        }
      }
      total_score {
        title
        value
      }
      location {
        id
        latitude
        longitude
        city
        country {
          id
          code
          name
        }
        state {
          id
          code
          name
        }
      }
      ratingScores {
        id
        title
        value
        name
        type {
          type_group {
            id
            title
          }
        }
      }
      numerics {
        id
        title
        value
        name
        type {
          unit
          max_value
        }
      }
      generics {
        id
        title
        value
        name
      }
      comments {
        id
        author
        comment
      }
    }
  }
`;

interface ResortPageProps {
  resortData: Resort | null;
  error?: {
    message: string;
  };
  initialApolloState: unknown;
}

// Helper function to wait
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch resort data with retry mechanism
const fetchResortWithRetry = async (apolloClient: any, url_segment: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`\n[Resort: ${url_segment}] Attempt ${i + 1} of ${retries}`);

      const { data } = await apolloClient.query({
        query: QUERY_RESORT,
        variables: { url_segment: url_segment },
      });

      if (!data || !data.resortByUrlSegment) {
        console.log(`\n[Resort: ${url_segment}] No data found on attempt ${i + 1}`);
        // If this is a "no data found" situation, don't retry - return null
        return null;
      }

      console.log(`\n[Resort: ${url_segment}] ✓ Success on attempt ${i + 1}`);
      return data;
    } catch (error) {
      console.log(`\n[Resort: ${url_segment}] ✗ Failed attempt ${i + 1} of ${retries}`);
      if (i === retries - 1) throw error;
      const waitTime = 1000 * (i + 1);
      console.log(`\n[Resort: ${url_segment}] Waiting ${waitTime}ms before retry...`);
      await wait(waitTime); // Exponential backoff
    }
  }
  throw new Error(`Failed to fetch after ${retries} retries`);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query({ query: QUERY_RESORTS_URL });
    console.log('\n[Static Paths] Found', data?.getAllResortUrlSegments?.length || 0, 'resorts to process');

    const paths = data?.getAllResortUrlSegments?.map((url_segment: string) => ({
      params: { url_segment },
    })) || [];

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching resort paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps<ResortPageProps> = async ({ params }) => {
  const apolloClient = initializeApollo();

  try {
    const data = await fetchResortWithRetry(apolloClient, params?.url_segment as string);

    if (data === null) {
      console.log(`\n[Resort: ${params?.url_segment}] ✗ Resort not found after query`);
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    if (!data.resortByUrlSegment) {
      console.log(`\n[Resort: ${params?.url_segment}] ✗ No resort data in response`);
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    return {
      props: {
        resortData: data.resortByUrlSegment,
        initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error(`Error fetching resort data for URL: ${params?.url_segment}`, error);

    let errorMessage = 'An unknown error occurred';
    if (error instanceof ApolloError || error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      props: {
        resortData: null,
        error: { message: errorMessage },
        initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: 60,
    };
  }
};

const ResortPage: React.FC<ResortPageProps> = ({ resortData, error }) => {
  const router = useRouter();

  useEffect(() => {
    // Track page view when component mounts or route changes
    if (!router.isFallback && resortData) {
      // Track specific resort view
      trackResortView(resortData.title);

      // Track page view
      pageview(new URL(window.location.href));
    }
  }, [router.isFallback, resortData, router.asPath]);

  if (router.isFallback) {
    return (
      <>
        <MetaTags resortData={null} />
        <ResortSingle loading resortData={null} />
      </>
    );
  }

  return (
    <>
      <MetaTags resortData={resortData} />
      <ResortSingle
        resortData={resortData}
        error={error}
      />
    </>
  );
};

export default ResortPage;
