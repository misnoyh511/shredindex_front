import React from 'react';
import Head from 'next/head';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const SITE_NAME = 'ShredIndex';
const DEFAULT_IMAGE = '/ShredIndexMetaImage.jpg';

const lifestyles = [
  { key: 'family_friendly', name: 'family_friendly', label: 'Family', description: 'Perfect for families with children, featuring easy slopes and comprehensive ski schools' },
  { key: 'shops', name: 'shops', label: 'Luxury', description: 'Premium resorts with high-end amenities and exclusive experiences' },
  { key: 'expert_terrain_score', name: 'expert_terrain_score', label: 'Extreme', description: 'Challenging terrain for advanced skiers seeking thrilling adventures' },
  { key: 'average_annual_snowfall', name: 'average_annual_snowfall', label: 'Powder', description: 'Destinations known for exceptional snow conditions and deep powder' },
  { key: 'total_score', name: 'helicopter', label: 'Helicopter', description: 'Ultimate skiing experience with helicopter access to pristine backcountry terrain' },
  { key: 'affordability', name: 'affordability', label: 'Affordable', description: 'Budget-friendly resorts offering great value without compromising on experience' },
] as const;

interface Resort {
  id: string;
  title: string;
  location?: {
    city?: string;
    state?: {
      name?: string;
    };
    country?: {
      name?: string;
    };
  };
  total_score?: {
    value: number;
  };
  description?: string;
  resort_images?: Array<{
    image: {
      path: string;
    };
    alt?: string;
    name?: string;
  }>;
}

interface HomeMetaTagsProps {
  currentLifestyle: string;
  resortData?: {
    [key: string]: Resort[];
  };
}

const MetaTagsFallback = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shredindex.com';

  return (
    <Head>
      <title>{SITE_NAME} - Discover Your Perfect Ski Resort</title>
      <meta name="description" content="Find your ideal ski resort based on your lifestyle. Compare worldwide destinations with expert reviews, detailed ratings, and comprehensive resort information." />
      <link rel="canonical" href={baseUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
    </Head>
  );
};

const HomeMetaTagsContent: React.FC<HomeMetaTagsProps> = ({ currentLifestyle, resortData = {} }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shredindex.com';

  const generateMetadata = () => {
    const currentLifestyleData = lifestyles.find(l => l.label === currentLifestyle);
    const topResorts = resortData[currentLifestyle] || [];
    const featuredResorts = topResorts.slice(0, 3).map(resort => resort.title).join(', ');

    const description = `Discover top ${currentLifestyle} ski resorts${featuredResorts ? `, including ${featuredResorts}` : ''}. ${currentLifestyleData?.description || ''} Compare resorts by lifestyle: ${lifestyles.map(l => l.label).join(', ')}. Find detailed reviews, ratings, and information to plan your perfect ski adventure.`;

    return {
      title: `${SITE_NAME} - Top ${currentLifestyle} Ski Resorts | Find Your Perfect Mountain`,
      description,
      url: baseUrl,
      images: [{
        url: `${baseUrl}${DEFAULT_IMAGE}`,
        alt: `Top ${currentLifestyle} ski resorts worldwide`,
      }],
      topResorts,
      currentLifestyleData,
    };
  };

  const metadata = generateMetadata();

  return (
    <Head>
      {/* Essential Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={metadata.url} />

      {/* Additional SEO Meta Tags */}
      <meta name="keywords" content={`ski resorts, ${lifestyles.map(l => `${l.label.toLowerCase()} ski resorts, ${l.label.toLowerCase()} skiing`).join(', ')}, ski reviews, resort comparison`} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph Meta Tags */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metadata.url} />
      <meta property="og:image" content={metadata.images[0].url} />
      <meta property="og:image:alt" content={metadata.images[0].alt} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ShredIndex" />
      <meta name="twitter:creator" content="@ShredIndex" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.images[0].url} />
      <meta name="twitter:image:alt" content={metadata.images[0].alt} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': metadata.url,
            name: SITE_NAME,
            description: metadata.description,
            url: metadata.url,
            image: metadata.images[0].url,
            potentialAction: {
              '@type': 'SearchAction',
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${metadata.url}/resorts/search?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`,
              },
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: [
                {
                  '@type': 'ItemList',
                  name: `Top ${currentLifestyle} Ski Resorts`,
                  description: metadata.currentLifestyleData?.description,
                  numberOfItems: metadata.topResorts.length,
                  itemListElement: metadata.topResorts.map((resort, index) => ({
                    '@type': 'TouristAttraction',
                    '@id': `${metadata.url}/resort/${resort.id}`,
                    position: index + 1,
                    name: resort.title,
                    description: resort.description,
                    ...(resort.location && {
                      address: {
                        '@type': 'PostalAddress',
                        addressLocality: resort.location.city,
                        addressRegion: resort.location.state?.name,
                        addressCountry: resort.location.country?.name,
                      },
                    }),
                    ...(resort.total_score && {
                      aggregateRating: {
                        '@type': 'AggregateRating',
                        ratingValue: resort.total_score.value,
                        bestRating: 100,
                        worstRating: 0,
                      },
                    }),
                    image: resort.resort_images?.[0]?.image.path
                      ? `${baseUrl}${resort.resort_images[0].image.path}`
                      : metadata.images[0].url,
                    url: `${metadata.url}/resort/${resort.id}`,
                  })),
                },
                {
                  '@type': 'ItemList',
                  name: 'Ski Resort Categories',
                  description: 'Browse ski resorts by lifestyle category',
                  numberOfItems: lifestyles.length,
                  itemListElement: lifestyles.map((lifestyle, index) => ({
                    '@type': 'Thing',
                    position: index + 1,
                    name: `${lifestyle.label} Ski Resorts`,
                    description: lifestyle.description,
                    url: `${metadata.url}/resorts?orderBy=${JSON.stringify({
                      type_name: lifestyle.key,
                      direction: 'desc',
                    })}`,
                  })),
                },
              ],
            },
          }, null, 2),
        }}
      />
    </Head>
  );
};

export const HomeMetaTags: React.FC<HomeMetaTagsProps> = (props) => {
  return (
    <ErrorBoundary fallback={<MetaTagsFallback />}>
      <HomeMetaTagsContent {...props} />
    </ErrorBoundary>
  );
};

export default HomeMetaTags;
