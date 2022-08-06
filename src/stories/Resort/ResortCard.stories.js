import React from 'react';
import { IntlProvider } from 'react-intl';
import ResortCardComponent from '../../js/components/ResortCard/ResortCard';
import ResortCardSkeleton from '../../js/components/SkeletonState/ResortCardSkeleton';
import { QUERY_RESORTS } from '../../js/hooks/useQueryResorts';
import langEn from '../../js/lang/en.json';
import NoCacheMockedProvider from '../../js/components/tests/NoCacheMockedProvider/NoCacheMockedProvider';

export default {
  title: 'Shred index/components',
  component: ResortCardComponent,
  argTypes: {
    cardState: {
      name: 'Card state',
      options: ['Full', 'Loading', 'Minimal Data', 'No Data'],
      control: { type: 'select' },
    },
    resortData: {
      table: {
        disable: true,
      },
    },
  },
};

export const ResortCard = (args) => {
  const { cardState } = args;
  const mocks = {
    resortCard: {
      request: {
        query: QUERY_RESORTS,
      },
      data:
        {
          id: '2',
          title: 'Tokyo Megaplex',
          url_segment: 'tokyo-megaplex',
          url: 'resorts/tokyo-megaplex',
          affiliate_url: 'https://www.shredindex/resorts/tokyo-megaplex',
          description: 'Tokyo Megaplex is a track from SSX. It is themed to a pinball machine, as you press many buttons, hit many blocks, and even pass through a pinball goal.',
          location: {
            id: '1',
            city: 'Tokyo',
            country: {
              id: '114',
              code: 'JP',
              name: 'Japan',
            },
            state: {
              id: '114',
              code: 'KW',
              name: 'Japan',
            },
          },
          total_score: {
            id: '1',
            title: 'Total Score',
            value: 76.8,
          },
          highlights: [
            {
              id: '1',
              title: 'Drum n Bass',
              value: 88,
            },
            {
              id: '6',
              title: 'Snow Quality',
              value: 69,
            },
            {
              id: '7',
              title: 'Sexy Bitches',
              value: 55.3,
            },
          ],
          lowlights: [
            {
              id: '2',
              title: 'Family Vacation Score',
              value: 42,
            },
            {
              id: '4',
              title: 'Cannabis Friendly',
              value: 21.6,
            },
            {
              id: '5',
              title: 'Co-working Spaces',
              value: 7.9,
            },
          ],
          resort_images: [
            {
              id: '1',
              name: 'Fernie Bowls',
              alt: 'fernie-bowls',
              sort_order: 1,
              image: {
                path: 'https://www.snowseasoncentral.com/wp-content/uploads/2020/01/fernie-bowls.jpg',
                content_type: 'image/jpeg',
              },
            },
            {
              id: '2',
              name: 'Tokyo Elevator',
              alt: 'tokyo-elevator',
              sort_order: 1,
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
          comments: [
            {
              id: '1',
              comment: 'Welcome back to Tokyo, where the manmade mammoth, Megaplex, has undergone a massive overhaul. Past challengers of the SSX World Circuit may recognize the locale, but the layout, paths, and jumps have been completely reworked at the staggering cost of 1.3 billion dollars. Getting to the suspended top level is going to be hard, staying there will be even harder.',
              author: 'SSX Narrator',
            },
            {
              id: '2',
              comment: 'I is get flickety wickety wicky whack slap joel on her back, this indoor slopestyle mayhem could pin an elephant to a doorknob, check it homeslice!',
              author: 'Slippery G Nasty',
            },
          ],
        },
    },
  };

  const mocksNoData = {
    resortCard: {
      request: {
        query: QUERY_RESORTS,
      },
      data: {
        id: '2',
        title: 'Tokyo Megaplex',
        url_segment: 'tokyo-megaplex',
        url: 'resorts/tokyo-megaplex',
        highlights: [
        ],
        lowlights: [
        ],
        resort_images: [
        ],
        comments: [
        ],
      },
    },
  };

  const mocksMinimalData = {
    resortCard: {
      request: {
        query: QUERY_RESORTS,
      },
      data: {
        id: '4',
        title: 'Tokyo Megaplex',
        url_segment: 'tokyo-megaplex',
        url: 'resorts/tokyo-megaplex',
        highlights: [
          {
            id: '1',
            title: 'Drum n Bass',
            value: 88,
          },
          {
            id: '6',
            title: 'Snow Quality',
            value: 69,
          },
        ],
        lowlights: [
          {
            id: '1',
            title: 'Drum n Bass',
            value: 88,
          },
          {
            id: '6',
            title: 'Snow Quality',
            value: 69,
          },
        ],
        resort_images: [
        ],
        comments: [
        ],
      },
    },
  };

  if (cardState === 'Loading') {
    return <ResortCardSkeleton />;
  }

  let mock;

  switch (cardState) {
    case 'Minimal Data':
      mock = mocksMinimalData.resortCard;
      break;
    case 'No Data':
      mock = mocksNoData.resortCard;
      break;
    default:
      mock = mocks.resortCard;
      break;
  }

  return (
    <IntlProvider locale="en" message={langEn}>
      <NoCacheMockedProvider mocks={[
        mocks.resortCard,
        mocksNoData.resortCard,
        mocksMinimalData.resortCard,
      ]}
      >
        <ResortCardComponent
          resortData={mock.data}
        />
      </NoCacheMockedProvider>
    </IntlProvider>

  );
};
