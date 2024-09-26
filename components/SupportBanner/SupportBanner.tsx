import { CImage } from '@coreui/react';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import SupportersLoadingState from './SupportBannerSkeleton';

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

const Supporters = () => {
  const { loading, data } = useQuery(QUERY_SUPPORTERS);

  if (loading) {
    return <SupportersLoadingState />;
  }

  const supporters = [...data.supporters];

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
              <CImage
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

const SupportBanner: React.FC = () => (
  <div className="support-banner">
    <div className="container p-4 d-flex align-items-center flex-wrap">
      <Supporters />
    </div>
  </div>
);

export default SupportBanner;
