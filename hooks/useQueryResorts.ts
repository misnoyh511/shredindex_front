import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

// Define the GraphQL query to fetch resorts
export const QUERY_RESORTS = gql`
  query Resorts($first: Int!, $page: Int!, $filter: Filter, $orderBy: OrderBy) {
    resorts(first: $first, page: $page, filter: $filter, orderBy: $orderBy) {
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
        ratingScores {
          id
          name
          title
          value
        }
        numerics {
          id
          name
          title
          value
          type {
            name
            unit
            max_value
          }
        }
        highlights {
          id
          name
          title
          value
        }
        lowlights {
          id
          name
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

// Custom hook to use the QUERY_RESORTS query
const useQueryResorts = (
  first: number,
  page: number,
  filter: any = null,
  orderBy: any = null
) => {
  // Construct the variables object for the query
  const variables: any = {
    first,
    page,
  };

  // Include filter only if it is provided
  if (filter && Object.keys(filter).length > 0) variables.filter = filter;

  // Include orderBy only if it is provided and valid
  if (orderBy && Object.keys(orderBy).length > 0) {
    variables.orderBy = orderBy;
  }

  // Execute the query and return the result
  const { loading, error, data } = useQuery(QUERY_RESORTS, {
    variables,
  });

  // Handle and log any errors
  if (error) {
    console.error('Error fetching resorts:', error);
  }

  return { loading, error, data };
};

export default useQueryResorts;
