import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import DynamicLayout from '../DynamicLayout/DynamicLayout';

/**
 * Restore the scroll everytime we change routes
 *
 * A handy component from https://v5.reactrouter.com/web/guides/scroll-restoration
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
};

export const QUERY_CMS_PAGES = gql`
  {
      cmsPages {
        url
      }
  }
`;

// eslint-disable-next-line import/prefer-default-export
const DynamicSwitch = () => {
  const { loading, data } = useQuery(QUERY_CMS_PAGES);

  if (loading) {
    return null;
  }

  const { cmsPages } = data;

  if (!cmsPages || !cmsPages.length) {
    throw new Error('Application failed to establish routing. CMS pages data missing.');
  }

  return (
    <>
      <ScrollToTop />
      <Switch>
        {cmsPages.map(({ url }) => (
          <Route exact key={url} path={url}>
            <DynamicLayout url={url} />
          </Route>
        ))}
      </Switch>
    </>
  );
};

export default DynamicSwitch;
