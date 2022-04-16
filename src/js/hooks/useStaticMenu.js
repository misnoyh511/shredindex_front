import { gql } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const QUERY_STATIC_MENU = gql`
  query staticMenu($code: String!) {
    staticMenu(code: $code) {
      menuItems {
        title
        url
        items {
          title
          url
        }
      }
    }
  }
`;

export const queryStaticMenu = (code) => ({
  query: QUERY_STATIC_MENU,
  variables: { code },
});

/**
 * To make header menu data handling a bit easier
 */
const useStaticMenu = (code) => {
  const { query, variables } = queryStaticMenu(code);
  const { loading, error, data } = useQuery(
    query,
    {
      variables,
    },
  );
  const { pathname } = useLocation();

  const items = useMemo(
    () => {
      if (!data) {
        // Nothing to do
        return [];
      }

      const { staticMenu: { menuItems } } = data;

      // Override the absolute URLs from the CMS with their relative URLs
      return menuItems.map((item) => {
        const { pathname: relUrl } = new URL(item.url);
        const isCurrent = relUrl === pathname;

        return { ...item, url: relUrl, isCurrent };
      });
    },
    [data, pathname],
  );

  return { loading, error, items };
};

export default useStaticMenu;
