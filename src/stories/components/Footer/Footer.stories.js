import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
import FooterComponent, { QUERY_SETTINGS, QUERY_TEAM_MEMBERS } from '../../../js/components/Footer/Footer';

export default {
  title: 'Shred index/components/Footer',
  component: FooterComponent,
};

export const Footer = () => {
  const mocks = {
    settings: {
      request: {
        query: QUERY_SETTINGS,
      },
      result: {
        data: {
          settings: {
            copyright_message: `Copyright ${new Date().getFullYear()} [Shred Index](#)`,
          },
        },
      },
    },
    teamMembers: {
      request: {
        query: QUERY_TEAM_MEMBERS,
      },
      result: {
        data: {
          teamMembers: [
            {
              name: 'Steph_nz',
              url: 'https://localhost/one',
              sort_order: 0,
              image: {
                path: 'https://source.unsplash.com/TW_z_iUD_bQ/300x300',
                content_type: 'image/png',
              },
            },
            {
              name: 'Bakhtawar',
              url: 'https://localhost/two',
              sort_order: 1,
              image: {
                path: 'https://source.unsplash.com/W0i1N6FdCWA/300x300',
                content_type: 'image/png',
              },
            },
          ],
        },
      },
    },
  };

  return (
    <MockedProvider mocks={[mocks.settings, mocks.teamMembers]} addTypename={false}>
      <FooterComponent />
    </MockedProvider>
  );
};
