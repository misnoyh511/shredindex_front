import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

export const QUERY_RESORTS = gql`
query Resorts($first: Int! $page: Int!){
  resorts(
    first: $first
    page: $page
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

const useQueryResorts = (first, page) => useQuery(
  QUERY_RESORTS,
  {
    variables: {
      first,
      page,
    },
  },
);

export default useQueryResorts;
