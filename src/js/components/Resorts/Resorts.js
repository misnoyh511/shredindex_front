import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

export const QUERY_RESORTS = gql`
  {
    resorts {
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

  return (
    resorts.map(({ id, url_segment, title }) => (
      <div key={id} className="px-3">
        <Link className="resort-link" to={`resorts/${url_segment}`}>
          {title}
        </Link>
      </div>
    ))
  );
};

export default Resorts;
