import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

// Define the GraphQL query to fetch resorts
export const QUERY_RESORTS_URL = gql`
  query GetAllResortUrlSegments {
    getAllResortUrlSegments
  }
`;

// Custom hook to use the QUERY_RESORTS query
const useQueryResortsUrl = () => {
  // Execute the query and return the result
  const { loading, error, data } = useQuery(QUERY_RESORTS_URL);

  // Handle and log any errors
  if (error) {
    console.error('Error fetching resorts:', error);
  }

  return { loading, error, data };
};

export default useQueryResortsUrl;
