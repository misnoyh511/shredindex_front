import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { gql, ApolloError } from '@apollo/client';
import { initializeApollo } from '../../lib/apollo-client';
import ResortSingle from '@/ResortSingle/ResortSingle';
import { Resort } from '../../types/resortTypes';

const QUERY_ALL_RESORTS = gql`
  query AllResorts {
    resorts {
      url_segment
    }
  }
`;

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

interface ErrorObject {
  message: string;
}

interface ResortPageProps {
  resortData: Resort | null;
  error?: ErrorObject;
  initialApolloState: unknown; // You might want to type this more specifically if possible
}

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query({ query: QUERY_ALL_RESORTS });

    const paths = data.resorts.map((resort: { url_segment: string }) => ({
      params: { url_segment: resort.url_segment },
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error fetching resort paths:', error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<ResortPageProps> = async ({ params }) => {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query({
      query: QUERY_RESORT,
      variables: { url_segment: params?.url_segment },
    });

    if (!data || !data.resortByUrlSegment) {
      return { notFound: true };
    }

    return {
      props: {
        resortData: data.resortByUrlSegment,
        initialApolloState: apolloClient.cache.extract(),
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching resort data:', error);
    let errorMessage = 'An unknown error occurred';
    if (error instanceof ApolloError || error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      props: {
        error: { message: errorMessage },
        resortData: null,
        initialApolloState: apolloClient.cache.extract(),
      },
    };
  }
};

const ResortPage: React.FC<ResortPageProps> = ({ resortData, error }) => {
  const router = useRouter();

  // Show loading state if the page is being generated
  if (router.isFallback) {
    return <ResortSingle loading resortData={null} />;
  }

  return <ResortSingle resortData={resortData} error={error} />;
};

export default ResortPage;
