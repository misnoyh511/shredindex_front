import React from 'react';
import Head from 'next/head';
import { Resort } from '../../types/resortTypes';

const DEFAULT_IMAGE = '/ShredIndexMetaImage.jpg';
const MAX_DESCRIPTION_LENGTH = 206;
const SITE_NAME = 'Your Ski Resort Guide';

interface MetaTagsProps {
  resortData: Resort | null;
}

export const MetaTags: React.FC<MetaTagsProps> = ({ resortData }) => {
  // Get base URL from environment or fallback to default
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shredindex.com';

  console.log('MetaTags', resortData);

  const generateMetadata = () => {
    if (!resortData) {
      return {
        title: 'Ski Resort Information - Not Found',
        description: 'Detailed information about ski resorts, including reviews, ratings, and facilities.',
        images: [{ url: `${baseUrl}${DEFAULT_IMAGE}`, alt: 'Default ski resort image' }],
        url: baseUrl,
        location: null,
        rating: null,
      };
    }

    // Generate location string
    const locationStr = [
      resortData.location?.city,
      resortData.location?.state?.name,
      resortData.location?.country?.name,
    ].filter(Boolean).join(', ');

    // Clean and format description
    const cleanDescription = resortData.description
      ?.replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const description = cleanDescription
      ? `${cleanDescription.substring(0, MAX_DESCRIPTION_LENGTH)}${cleanDescription.length > MAX_DESCRIPTION_LENGTH ? '...' : ''}`
      : `Discover ${resortData.title} ski resort in ${locationStr}. Read reviews and get detailed information about this stunning winter destination.`;

    // Process all resort images
    const images = resortData.resort_images?.length
      ? resortData.resort_images
        .filter(img => img?.image?.path)
        .map(img => ({
          url: img.image.path.startsWith('http')
            ? img.image.path
            : `${process.env.NEXT_PUBLIC_API_URL}${img.image.path}`,
          alt: img.alt || `${resortData.title} ski resort - ${img.name || 'view'}`,
        }))
      : [{
        url: `${baseUrl}${DEFAULT_IMAGE}`,
        alt: `${resortData.title} ski resort`,
      }];

    // Format reviews
    const reviews = resortData.comments?.map(comment => ({
      author: comment.author,
      comment: comment.comment,
    }));

    return {
      title: `${resortData.title} Ski Resort ${locationStr ? `- ${locationStr}` : ''} | Reviews & Information`,
      description,
      images,
      url: `${baseUrl}/resort/${resortData.url_segment}`,
      location: {
        latitude: resortData.location?.latitude,
        longitude: resortData.location?.longitude,
        city: resortData.location?.city,
        state: resortData.location?.state?.name,
        country: resortData.location?.country?.name,
      },
      rating: resortData.total_score ? {
        value: resortData.total_score.value,
        count: reviews?.length || 0,
        reviews,
      } : null,
    };
  };

  const metadata = generateMetadata();
  const locationString = metadata.location ? [
    metadata.location.city,
    metadata.location.state,
    metadata.location.country,
  ].filter(Boolean).join(', ') : '';

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
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
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
