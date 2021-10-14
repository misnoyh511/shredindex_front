import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
import React from 'react';
import ResortCard from '../ResortCard/ResortCard';

export const QUERY_RESORTS = gql`
  {
    resorts(
      orderBy: {
        type_name: "total_score",
        direction: "desc"
      }
    ) {
      data {
        id
        title
        url_segment
      }
    }
  }
`;

const Resorts = () => {
  const { loading, data } = useQuery(QUERY_RESORTS);

  if (loading) {
    return <></>;
  }

  const { resorts: { data: resorts } } = data;

  return resorts.map(({ id, url_segment }) => (
    <ResortCard key={id} resortId={id} urlSegment={url_segment} />
  ));
};

export default Resorts;
