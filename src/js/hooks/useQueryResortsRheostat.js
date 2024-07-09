import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

export const QUERY_RESORTS_RHEOSTAT = gql`
query Resorts($first: Int! $page: Int! $filter: Filter $orderBy: OrderBy){
  resorts(
    first: $first
    page: $page
    filter: $filter
    orderBy: $orderBy
  ) {
    data {
      ratingScores {
        name
        value
      }
    }
  }
}
`;

const useQueryResortsRheostat = (first, page, filter, orderBy) => useQuery(
  QUERY_RESORTS_RHEOSTAT,
  {
    variables: {
      first,
      page,
      filter,
      orderBy,
    },
  },
);

export default useQueryResortsRheostat;
