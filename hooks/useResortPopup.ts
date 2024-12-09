import { gql, useQuery } from '@apollo/client';
import { Resort } from '../types/resortTypes';

export const QUERY_RESORT_POPUP = gql`
  query ResortPopup($url_segment: String!) {
    resortByUrlSegment(url_segment: $url_segment) {
      id
      title
      url_segment
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
        value
      }
      location {
        id
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
    }
  }
`;

export const useResortPopup = (url_segment: string) => {
  const { loading, error, data } = useQuery(QUERY_RESORT_POPUP, {
    variables: { url_segment },
  });

  return {
    loading,
    error,
    resort: data?.resortByUrlSegment as Resort | undefined,
  };
};
