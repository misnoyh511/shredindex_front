import React from 'react';
import { IntlProvider } from 'react-intl';
import SupportBannerComponent, {
  QUERY_SUPPORTERS,
} from '../../../js/components/SupportBanner/SupportBanner';
import NoCacheMockedProvider
  from '../../../js/components/tests/NoCacheMockedProvider/NoCacheMockedProvider';
import langEn from '../../../js/lang/en.json';

export default {
  title: 'Shred index/components/Support Banner',
  component: SupportBannerComponent,
};

export const SupportBanner = () => {
  const mocks = {
    supporters: {
      request: {
        query: QUERY_SUPPORTERS,
      },
      result: {
        data: {
          supporters: [
            {
              name: 'Visa',
              url: 'https://freebiesupply.com/logos/visa-logo/',
              sort_order: 1,
              image: {
                path: 'https://cdn.freebiesupply.com/logos/large/2x/visa-logo-png-transparent.png',
                content_type: 'image/png',
              },
            },
            {
              name: 'The North Face',
              url: 'https://freebiesupply.com/logos/the-north-face-logo/',
              sort_order: 2,
              image: {
                path: 'https://cdn.freebiesupply.com/logos/large/2x/the-north-face-1-logo-png-transparent.png',
                content_type: 'image/png',
              },
            },
            {
              name: 'Pepsi',
              url: 'https://freebiesupply.com/logos/pepsi-logo/',
              sort_order: 3,
              image: {
                path: 'https://cdn.freebiesupply.com/logos/large/2x/pepsi-logo-png-transparent.png',
                content_type: 'image/png',
              },
            },
            {
              name: 'Ray Ban',
              url: 'https://freebiesupply.com/logos/ray-ban-logo/',
              sort_order: 4,
              image: {
                path: 'https://cdn.freebiesupply.com/logos/large/2x/ray-ban-logo-png-transparent.png',
                content_type: 'image/png',
              },
            },
            {
              name: 'TEST',
              url: 'https://freebiesupply.com/logos/test-logo-2/',
              sort_order: 0,
              image: {
                path: 'https://cdn.freebiesupply.com/logos/large/2x/test-1-logo-png-transparent.png',
                content_type: 'image/png',
              },
            },
          ],
        },
      },
    },
  };

  return (
    <NoCacheMockedProvider mocks={[mocks.supporters]}>
      <IntlProvider locale="en" message={langEn}>
        <SupportBannerComponent />
      </IntlProvider>
    </NoCacheMockedProvider>
  );
};
