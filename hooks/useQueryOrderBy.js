import { useQuery } from '@apollo/client';
import { QUERY_TYPES } from './useQueryTypes';


const UseQueryOrderBy = () => {
  const {
    loading,
    error,
    data,
  } = useQuery(QUERY_TYPES);

  const orderOptions = [];
  const mappedOptions = [];
  if (data) {
    const scores = data.types.filter((item) => (item?.category === 'Underflip\\Resorts\\Models\\Rating'));
    const numerics = data.types.filter((item) => (item?.category === 'Underflip\\Resorts\\Models\\Numeric'));
    const totalScore = [{
      label: 'Total score',
      value: 'total_score',
    }];

    orderOptions.push(...scores);
    orderOptions.push(...numerics);

    mappedOptions.push(...totalScore, ...orderOptions.map((orderType) => ({
      label: orderType.title,
      value: orderType.name,
    })));

    return { loading, error, mappedOptions };
  }

  return { loading, error, mappedOptions };
};

export default UseQueryOrderBy;
