import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { gql, ApolloError } from '@apollo/client';
import { initializeApollo } from '../../lib/apollo-client';
import ResortSingle from '@/ResortSingle/ResortSingle';
import { Resort } from '../../types/resortTypes';
import { QUERY_RESORTS_URL } from '../../hooks/useQueryResortsUrl';
import { generateMetadata, MetaTags } from '../../components/MetaTags/MetaTags';

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
        created_at
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

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query({ query: QUERY_RESORTS_URL });
    const paths = data?.getAllResortUrlSegments?.map((url_segment: string) => ({
      params: { url_segment },
    })) || [];

    return {
      paths,
      fallback: 'blocking', // Show the fallback page while generating new pages
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
    const { data } = await apolloClient.query({
      query: QUERY_RESORT,
      variables: { url_segment: params?.url_segment },
    });

    // If no data was found, return 404
    if (!data || !data.resortByUrlSegment) {
      return {
        notFound: true,
        revalidate: 60, // Revalidate every minute in case the resort becomes available
      };
    }

    return {
      props: {
        resortData: data.resortByUrlSegment,
        initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: 3600, // Revalidate every hour for existing resorts
    };
  } catch (error) {
    console.error('Error fetching resort data:', error);

    // Handle error message
    let errorMessage = 'An unknown error occurred';
    if (error instanceof ApolloError || error instanceof Error) {
      errorMessage = error.message;
    }

    // Return error state but don't show 404
    return {
      props: {
        resortData: null,
        error: { message: errorMessage },
        initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: 60, // Revalidate more frequently when there's an error
    };
  }
};

const ResortPage: React.FC<ResortPageProps> = ({ resortData, error }) => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourwebsite.com';

  // Show loading state while the page is being generated
  if (router.isFallback) {
    return (
      <>
        <MetaTags
          metadata={generateMetadata(null, baseUrl)}
        />
        <ResortSingle loading resortData={null} />
      </>
    );
  }

  // Generate metadata for the current resort
  const metadata = generateMetadata(resortData, baseUrl);

  return (
    <>
      <MetaTags metadata={metadata} />
      <ResortSingle
        resortData={resortData}
        error={error}
      />
    </>
  );
};

// Enable automatic static optimization
export default ResortPage;
