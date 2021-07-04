import { CImg } from '@coreui/react';
import { gql } from 'apollo-boost';
import React from 'react';
import { useQuery } from 'react-apollo';

export const QUERY_SUPPORTERS = gql`
  {
    supporters {
      name
      url
      sort_order
      image {
        path
        content_type
      }
    }
  }
`;

const SupportBanner = () => (
  <div className="container">
    <div className="support-banner p-4 d-flex align-items-center flex-wrap">
      <Supporters />
    </div>
  </div>
);

const Supporters = () => {
  const { loading, data } = useQuery(QUERY_SUPPORTERS);

  if (loading) {
    return <></>;
  }

  const { supporters } = data;

  return supporters
    .sort((a, b) => (a.sort_order > b.sort_order ? 1 : -1))
    .map((supporter) => {
      const {
        name, url, image: { path }, sort_order,
      } = supporter;

      return (
        <div className="support-banner__supporter m-auto p-3" key={sort_order}>
          <a href={url} className="support-banner__supporter-link" rel="noopener noreferrer">
            {path && (
              <CImg
                src={path}
                className="support-banner__supporter-image opacity-3"
                alt={name}
              />
            )}
          </a>
        </div>
      );
    });
};

export default SupportBanner;
