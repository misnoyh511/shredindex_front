import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import ResortComponent, { QUERY_RESORT } from '../../js/pages/Resort/Resort';
import NoCacheMockedProvider from '../../js/components/tests/NoCacheMockedProvider/NoCacheMockedProvider';
import langEn from '../../js/lang/en.json';

export default {
  title: 'Shred index/components/Resort',
  component: ResortComponent,
};

export const Resort = () => {
  const mocks = {
    resortByUrlSegment: {
      request: {
        query: QUERY_RESORT,
        variables: {
          url_segment: 'pipedream',
        },
      },
      result: {
        data: {
          resortByUrlSegment: {
            id: '3',
            title: 'Pipe Dream',
            url_segment: 'pipedream',
            description: 'Perpendicular curves to the ceiling for maximum air time.',
            resort_images: [
              {
                id: '1',
                name: 'Image 1',
                alt: 'Image 1 alt text',
                sort_order: 1,
                image: {
                  path: '/path/to/image1.jpg',
                  content_type: 'image/jpeg',
                  __typename: 'ImageType',
                },
                __typename: 'ResortImageType',
              },
            ],
            total_score: {
              title: 'Total Score',
              value: 85,
              __typename: 'ScoreType',
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
                __typename: 'LocationItem',
              },
              state: {
                id: '22',
                code: 'CAN',
                name: 'Dont have a State ey bro',
                __typename: 'LocationItem',
              },
              __typename: 'LocationType',
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
                __typename: 'Rating',
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
                  __typename: 'Type',
                },
                __typename: 'Numeric',
              },
            ],
            generics: [
              {
                id: '1',
                title: 'Snow Making',
                value: 'true',
                name: 'snow_making',
                __typename: 'Generic',
              },
            ],
            comments: [
              {
                id: '1',
                author: 'John Doe',
                comment: 'Amazing place!',
                __typename: 'Comment',
              },
            ],
            __typename: 'Resort',
          },
        },
      },
    },
  };

  return (
    <MemoryRouter initialEntries={['/resorts/pipedream']}>
      <IntlProvider locale="en" messages={langEn}>
        <Routes>
          <Route
            exact
            path="resorts/:url_segment"
            element={(
              <NoCacheMockedProvider mocks={[mocks.resortByUrlSegment]}>
                <ResortComponent />
              </NoCacheMockedProvider>
            )}
          />
        </Routes>
      </IntlProvider>
    </MemoryRouter>
  );
};
