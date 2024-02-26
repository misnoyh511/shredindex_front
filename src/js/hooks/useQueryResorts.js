import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

export const QUERY_RESORTS = gql`
query Resorts($first: Int! $page: Int! $filter: [Filter!]){
  resorts(
    first: $first
    page: $page
    filter: $filter
    orderBy: {
      type_name: "total_score",
      direction: "desc"
    }
  ) {
    data {
      id
      title
      url_segment
      url
      affiliate_url
      description
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
      total_score {
        id
        title
        value
      }
      numerics {
        id
        title
        value
        unit
        max_value
      }
      highlights {
        id
        title
        value
      }
      lowlights {
        id
        title
        value
      }
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
      comments {
        id
        comment
        author
      }
    }
    paginatorInfo {
      total
      currentPage
      lastPage
    }
  }
}
`;

const useQueryResorts = (first, page, filter) => useQuery(
  QUERY_RESORTS,
  {
    variables: {
      first,
      page,
      filter,
    },
  },
);

export default useQueryResorts;
