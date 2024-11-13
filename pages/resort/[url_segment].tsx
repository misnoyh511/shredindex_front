import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { gql, ApolloError } from '@apollo/client';
import { initializeApollo } from '../../lib/apollo-client';
import ResortSingle from '@/ResortSingle/ResortSingle';
import { Resort } from '../../types/resortTypes';
import { QUERY_RESORTS_URL } from '../../hooks/useQueryResortsUrl';

interface MetaData {
  title: string;
  description: string;
  images: string[];
  url: string;
  type: string;
}

const generateMetadata = (resort: Resort, baseUrl: string): MetaData => {
  const images = resort.resort_images.map(img => `${baseUrl}${img.image.path}`);

  return {
    title: `${resort.title} - Ski Resort Details and Reviews`,
    description: resort.description?.substring(0, 155) || `Details and reviews for ${resort.title} ski resort`,
    images: images,
    url: `${baseUrl}/resorts/${resort.url_segment}`,
    type: 'website',
  };
};

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

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query({ query: QUERY_RESORTS_URL });
    const paths = data?.getAllResortUrlSegments?.map((url_segment: string) => ({
      params: { url_segment },
    })) || [];

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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourwebsite.com';

  // Show loading state if the page is being generated
  if (router.isFallback) {
    return <ResortSingle loading resortData={null} />;
  }

  // Generate metadata if resort data is available
  const metadata = resortData ? generateMetadata(resortData, baseUrl) : null;

  return (
    <>
      {metadata && (
        <>

        <Head>
          {/* Basic Meta Tags */}
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />

          {/* Open Graph Meta Tags */}
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:type" content={metadata.type} />
          <meta property="og:url" content={metadata.url} />
          {metadata.images[0] && <meta property="og:image" content={metadata.images[0]} />}

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          {metadata.images[0] && <meta name="twitter:image" content={metadata.images[0]} />}

          {/* Schema.org JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'TouristAttraction',
                name: resortData?.title,
                description: metadata.description,
                image: metadata.images,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: resortData?.location?.city,
                  addressRegion: resortData?.location?.state?.code,
                  addressCountry: resortData?.location?.country?.code,
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: resortData?.location?.latitude,
                  longitude: resortData?.location?.longitude,
                },
                aggregateRating: resortData?.total_score ? {
                  '@type': 'AggregateRating',
                  ratingValue: resortData?.total_score.value,
                  bestRating: '100',
                  worstRating: '0',
                } : undefined,
              }),
            }}
          />
        </Head>
        <ResortSingle resortData={resortData} error={error} />
        </>
      )}
</>
  );
};

export default ResortPage;
