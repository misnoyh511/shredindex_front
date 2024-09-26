import React from 'react';
import { IntlProvider } from 'react-intl';
import ResortSingle from '@/ResortSingle/ResortSingle';
import langEn from '../../../lang/en.json';

export default {
  title: 'Shred index/components/ResortSingle',
  component: ResortSingle,
  decorators: [
    (Story) => (
      <IntlProvider locale="en" messages={langEn}>
        <Story />
      </IntlProvider>
    ),
  ],
};

const defaultNextRouter = {
  push: () => Promise.resolve(),
  replace: () => Promise.resolve(),
  prefetch: () => Promise.resolve(),
  route: '/resorts/[url_segment]',
  pathname: '/resorts/pipedream',
  query: { url_segment: 'pipedream' },
  asPath: '/resorts/pipedream',
  events: {
    on: () => {},
    off: () => {},
  },
  isFallback: false,
};

export const ResortStory = () => {
  const mockResortData = {
    id: '3',
    title: 'Pipe Dream',
    url_segment: 'pipedream',
    affiliate_url: 'https://www.awin1.com/awclick.php?awinaffid=1664769&mid=6776&p=https%3A%2F%2Fwww.booking.com%2Fsearchresults.html%3Fss%3DWhistler%26checkin%3D2023-12-15%26checkout%3D2023-12-22',
    description: 'Perpendicular curves to the ceiling for maximum air time.',
    resort_images: [
      {
        id: '1',
        name: 'Image 1',
        alt: 'Image 1 alt text',
        sort_order: 1,
        image: {
          path: 'https://www.snowseasoncentral.com/wp-content/uploads/2020/01/fernie-bowls.jpg',
          content_type: 'image/jpeg',
        },
      },
      {
        id: '2',
        name: 'Image 2',
        alt: 'Image 2 alt text',
        sort_order: 2,
        image: {
          path: 'https://www.merqurycity.com/ssximages/tokyoinelevator.jpg',
          content_type: 'image/jpeg',
        },
      },
      {
        id: '3',
        name: 'Lots of Air',
        alt: 'lots-of-air',
        sort_order: 1,
        image: {
          path: 'https://www.mobygames.com/images/shots/l/109138-ssx-tricky-gamecube-screenshot-you-can-get-a-lot-of-air-at.png',
          content_type: 'image/jpeg',
        },
      },
    ],
    total_score: {
      title: 'Total Score',
      value: 85,
    },
    location: {
      id: '3',
      latitude: -77.85,
      longitude: 166.666,
      city: 'McMurdo Station',
      country: {
        id: '161',
        code: 'NZ',
        name: 'Antarctica',
      },
      state: {
        id: '22',
        code: 'CAN',
        name: 'Dont have a State ey bro',
      },
    },
    ratingScores: [
      {
        id: '2',
        title: 'Digital Nomad Score',
        value: 76,
        name: 'digital_nomad_score',
        type: {
          type_group: {
            id: 1,
            title: 'Smokey Boris',
          },
        },
      },
    ],
    numerics: [
      {
        id: '1',
        title: 'Average Annual Snowfall',
        value: 10,
        name: 'average_annual_snowfall',
        type: {
          unit: 'cm',
          max_value: 100,
        },
      },
    ],
    generics: [
      {
        id: '1',
        title: 'Snow Making',
        value: 'true',
        name: 'snow_making',
      },
    ],
    comments: [
      {
        id: '1',
        author: 'John Doe',
        comment: 'Amazing place!',
      },
    ],
  };

  return <ResortSingle resortData={mockResortData} />;
};

ResortStory.parameters = {
  nextRouter: defaultNextRouter,
};

export const MinimalDataStory = () => {
  const minimalResortData = {
    id: '1',
    title: 'Minimal ResortSingle',
    url_segment: 'minimal-resort',
    affiliate_url: 'minimal-resort',
    description: 'A resort with minimal data.',
    location: {
      city: 'Minimal City',
      country: {
        name: 'Minimal Country',
      },
    },
    total_score: {
      value: 50,
    },
  };

  return <ResortSingle resortData={minimalResortData} />;
};

MinimalDataStory.parameters = {
  nextRouter: {
    ...defaultNextRouter,
    pathname: '/resorts/minimal-resort',
    query: { url_segment: 'minimal-resort' },
    asPath: '/resorts/minimal-resort',
  },
};

export const NoDataStory = () => {
  return <ResortSingle resortData={null} />;
};

NoDataStory.parameters = {
  nextRouter: {
    ...defaultNextRouter,
    pathname: '/resorts/not-found',
    query: { url_segment: 'not-found' },
    asPath: '/resorts/not-found',
  },
};

export const LoadingStory = () => {
  return <ResortSingle loading={true} />;
};

LoadingStory.parameters = {
  nextRouter: defaultNextRouter,
};

export const MaxDataStory = () => {
  const maxResortData = {
    id: '999',
    title: 'Super Ultra Mega ResortSingle Extreme',
    url_segment: 'super-ultra-mega-resort-extreme',
    affiliate_url: 'https://www.example.com/super-ultra-mega-resort-extreme',
    description: 'The Latemar – Obereggen/ Pampeago/ Predazzo ski resort is a top-rated destination in the Dolomites, celebrated for its variety of ski slopes ranging from blue to black. It caters to all levels of skiers, including children and beginners, making it a family-friendly location. The ski area features numerous lifts, primarily cabins and multiple seats, ensuring fast and comfortable access to the slopes.\n' +
      ' \n' +
      '\n' +
      ' The resort is particularly praised for its well-prepared slopes and the excellent condition of the black runs. The snow quality in specific areas such as Cermis or Pampeago is often described as perfect, enhancing the skiing experience. The resort also boasts over 100km of slopes including Alpe Lusia and the Predazzo area.\n' +
      ' \n' +
      '\n' +
      ' Aside from skiing, the resort offers a variety of amenities including restaurants, bars, and hotels located conveniently next to the piste. The friendly atmosphere and the array of activities available ensure that guests never get bored. During the summer, the resort transforms into a hiking paradise.\n' +
      ' \n' +
      '\n' +
      ' However, the resort can get crowded during weekends and the cost for a multi-day ski pass has increased over the years. In addition, the alpine coaster ride, though fun, is noted to be short and relatively expensive. Despite these minor drawbacks, the Latemar – Obereggen/ Pampeago/ Predazzo ski resort is highly recommended for its quality facilities, stunning views, and diverse range of slopes. It remains one of the best ski resorts in Trentino, providing an unforgettable experience for its visitors.', // Repeated to make it extra long
    resort_images: Array(20).fill().map((_, index) => ({ // 20 images
      id: `${index + 1}`,
      name: `Image ${index + 1}`,
      alt: `Detailed description of Image ${index + 1} showcasing various aspects of the Super Ultra Mega Resort Extreme`,
      sort_order: index + 1,
      image: {
        path: 'https://www.snowseasoncentral.com/wp-content/uploads/2020/01/fernie-bowls.jpg',
        content_type: 'image/jpeg',
      },
    })),
    total_score: {
      title: 'Overall Awesomeness Score',
      value: 99.9,
    },
    location: {
      id: '9999',
      latitude: 42.123456,
      longitude: -122.123456,
      city: 'Megapolis',
      country: {
        id: '999',
        code: 'MG',
        name: 'Megaland',
      },
      state: {
        id: '99',
        code: 'ML',
        name: 'Megastate',
      },
    },
    ratingScores: Array(15).fill().map((_, index) => ({ // 15 rating scores
      id: `${index + 1}`,
      title: `Super Important Rating ${index + 1}`,
      value: 90 + (index % 10), // Values between 90 and 99
      name: `super_important_rating_${index + 1}`,
      type: {
        type_group: {
          id: index + 1,
          title: `Category ${index + 1}`,
        },
      },
    })),
    numerics: Array(20).fill().map((_, index) => ({ // 20 numeric values
      id: `${index + 1}`,
      title: `Critical Stat ${index + 1}`,
      value: (index + 1) * 100,
      name: `critical_stat_${index + 1}`,
      type: {
        unit: ['cm', 'm', 'km', 'ft', 'mi'][index % 5],
        max_value: (index + 1) * 1000,
      },
    })),
    generics: Array(10).fill().map((_, index) => ({ // 10 generic attributes
      id: `${index + 1}`,
      title: `Special Feature ${index + 1}`,
      value: index % 2 === 0 ? 'true' : 'false',
      name: `special_feature_${index + 1}`,
    })),
    comments: Array(50).fill().map((_, index) => ({ // 50 comments
      id: `${index + 1}`,
      author: `Super Enthusiastic Reviewer ${index + 1}`,
      comment: 'This is an incredibly detailed and long comment about the Super Ultra Mega Resort Extreme. The commenter goes into great depth about their experience, discussing every aspect of their stay in minute detail. They rave about the facilities, the staff, the ski conditions, and everything else they encountered during their visit. The comment goes on for several paragraphs, covering topics such as the quality of the snow, the variety of runs, the efficiency of the lifts, the deliciousness of the food, the comfort of the accommodations, and the overall atmosphere of the resort. It\'s a thorough and enthusiastic review that leaves no stone unturned in its praise of the Super Ultra Mega Resort Extreme.'.repeat(2), // Repeated to make it extra long
    })),
  };

  return <ResortSingle resortData={maxResortData} />;
};

MaxDataStory.parameters = {
  nextRouter: {
    ...defaultNextRouter,
    pathname: '/resorts/super-ultra-mega-resort-extreme',
    query: { url_segment: 'super-ultra-mega-resort-extreme' },
    asPath: '/resorts/super-ultra-mega-resort-extreme',
  },
};

export const ErrorStory = () => {
  const errorState = {
    error: true,
    errorMessage: 'An error occurred while fetching resort data. Please try again later.',
  };

  return <ResortSingle {...errorState} />;
};

ErrorStory.parameters = {
  nextRouter: {
    ...defaultNextRouter,
    pathname: '/resorts/error',
    query: { url_segment: 'error' },
    asPath: '/resorts/error',
  },
};
