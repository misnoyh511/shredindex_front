import React from 'react';
import Head from 'next/head';
import { Resort } from '../../types/resortTypes';

interface MetaData {
  title: string;
  description: string;
  images: Array<{
    url: string;
    alt?: string;
  }>;
  url: string;
  type: string;
  siteName: string;
  location?: {
    latitude?: number;
    longitude?: number;
    city?: string;
    state?: string;
    country?: string;
  };
  rating?: {
    value: number;
    count?: number;
    reviews?: Array<{
      author: string;
      comment: string;
    }>;
  };
}

const DEFAULT_IMAGE = '../../images/ShredIndexMetaImage.jpg';
const MAX_DESCRIPTION_LENGTH = 200;
const SITE_NAME = 'Your Ski Resort Guide';

export const generateMetadata = (resort: Resort | null, baseUrl: string = typeof window !== 'undefined' ? window.location.origin : ''): MetaData => {
  if (!resort) {
    return {
      title: 'Ski Resort Information - Not Found',
      description: 'Detailed information about ski resorts, including reviews, ratings, and facilities.',
      images: [{ url: `${baseUrl}${DEFAULT_IMAGE}`, alt: 'Default ski resort image' }],
      url: baseUrl,
      type: 'website',
      siteName: SITE_NAME,
    };
  }

  // Generate location string
  const locationStr = [
    resort.location?.city,
    resort.location?.state?.name,
    resort.location?.country?.name,
  ].filter(Boolean).join(', ');

  // Clean and format description
  const cleanDescription = resort.description
    ?.replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const description = cleanDescription
    ? `${cleanDescription.substring(0, MAX_DESCRIPTION_LENGTH)}${cleanDescription.length > MAX_DESCRIPTION_LENGTH ? '...' : ''}`
    : `Discover ${resort.title} ski resort in ${locationStr}. Read reviews and get detailed information about this stunning winter destination.`;

  // Process images
  const images = resort.resort_images
    ?.filter(img => img?.image?.path)
    .map(img => ({
      url: img.image.path.startsWith('http') ? img.image.path : `${baseUrl}${img.image.path}`,
      alt: img.alt || `${resort.title} ski resort - ${img.name}`,
    })) || [{
    url: `${baseUrl}${DEFAULT_IMAGE}`,
    alt: `${resort.title} ski resort`,
  }];

  // Format reviews/ratings
  const reviews = resort.comments?.map(comment => ({
    author: comment.author,
    comment: comment.comment,
  }));

  return {
    title: `${resort.title} Ski Resort ${locationStr ? `- ${locationStr}` : ''} | Reviews & Information`,
    description,
    images,
    url: `${baseUrl}/resorts/${resort.url_segment}`,
    type: 'website',
    siteName: SITE_NAME,
    location: {
      latitude: resort.location?.latitude,
      longitude: resort.location?.longitude,
      city: resort.location?.city,
      state: resort.location?.state?.name,
      country: resort.location?.country?.name,
    },
    rating: resort.total_score ? {
      value: resort.total_score.value,
      count: reviews?.length || 0,
      reviews,
    } : undefined,
  };
};

export const MetaTags: React.FC<{ metadata: MetaData }> = ({ metadata }) => {
  const locationString = [
    metadata.location?.city,
    metadata.location?.state,
    metadata.location?.country,
  ].filter(Boolean).join(', ');

  return (
    <Head>
      {/* Essential Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={metadata.url} />

      {/* Additional SEO Meta Tags */}
      <meta name="keywords" content={`ski resort, ${metadata.location?.city || ''}, ${metadata.location?.state || ''}, skiing, snowboarding, winter sports`} />
      {metadata.location?.latitude && metadata.location?.longitude && (
        <meta name="geo.position" content={`${metadata.location.latitude};${metadata.location.longitude}`} />
      )}
      {locationString && <meta name="geo.placename" content={locationString} />}
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content={metadata.siteName} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content={metadata.type} />
      <meta property="og:url" content={metadata.url} />
      {metadata.images.map((image, index) => (
        <React.Fragment key={`og:image:${index}`}>
          <meta property="og:image" content={image.url} />
          {image.alt && <meta property="og:image:alt" content={image.alt} />}
        </React.Fragment>
      ))}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@YourTwitterHandle" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      {metadata.images[0] && (
        <>
          <meta name="twitter:image" content={metadata.images[0].url} />
          {metadata.images[0].alt && <meta name="twitter:image:alt" content={metadata.images[0].alt} />}
        </>
      )}

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['TouristAttraction', 'Place'],
            '@id': metadata.url,
            name: metadata.title.split(' | ')[0],
            description: metadata.description,
            url: metadata.url,
            image: metadata.images.map(img => img.url),
            ...(locationString && {
              address: {
                '@type': 'PostalAddress',
                addressLocality: metadata.location?.city,
                addressRegion: metadata.location?.state,
                addressCountry: metadata.location?.country,
              },
            }),
            ...(metadata.location?.latitude && metadata.location?.longitude && {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: metadata.location.latitude,
                longitude: metadata.location.longitude,
              },
            }),
            ...(metadata.rating && {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: metadata.rating.value,
                ratingCount: metadata.rating.count,
                bestRating: 100,
                worstRating: 0,
              },
              review: metadata.rating.reviews?.map(review => ({
                '@type': 'Review',
                author: {
                  '@type': 'Person',
                  name: review.author,
                },
                reviewBody: review.comment,
              })),
            }),
            // Add breadcrumbs for better site structure understanding
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@id': metadata.url.split('/resorts/')[0],
                    name: 'Home',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@id': `${metadata.url.split('/resorts/')[0]}/resorts`,
                    name: 'Ski Resorts',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  item: {
                    '@id': metadata.url,
                    name: metadata.title.split(' | ')[0],
                  },
                },
              ],
            },
          }, null, 2),
        }}
      />
    </Head>
  );
};
