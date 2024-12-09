import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

// Define the GraphQL query to fetch resorts
export const QUERY_RESORTS_MAP = gql`
  query Resorts($first: Int!, $page: Int!, $filter: Filter, $orderBy: OrderBy) {
    resorts(first: $first, page: $page, filter: $filter, orderBy: $orderBy) {
      data {
        id
        title
        url_segment
        url
        affiliate_url
        location {
          id
          latitude
          longitude
        }
        keyInsight(type_name: $orderBy) {
          name
          title
          value
          source
          type {
            name
            unit
            max_value
          }
        }
        total_score {
          id
          title
          value
        }
      }
    }
  }
`;

// Custom hook to use the QUERY_RESORTS query
const useQueryResortsMap = (
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
  const { loading, error, data } = useQuery(QUERY_RESORTS_MAP, {
    variables,
  });

  // Handle and log any errors
  if (error) {
    console.error('Error fetching resorts:', error);
  }

  return { loading, error, data };
};

export default useQueryResortsMap;
