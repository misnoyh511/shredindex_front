import { gql, useQuery } from '@apollo/client';

export const QUERY_RESORTS_RHEOSTAT = gql`
query ResortRatingsForRheostat($typeName: String!) {
    rheostatDirective(typeName: $typeName) {
      min
      max
      tickers
      totalResorts
    }
    types {
      name
      max_value
      category
    }
  }
`;

const useQueryResortsRheostat = (typeName) => useQuery(
  QUERY_RESORTS_RHEOSTAT,
  {
    variables: { typeName },
    fetchPolicy: 'cache-first',
  },
);

export default useQueryResortsRheostat;
