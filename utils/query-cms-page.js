import { gql } from '@apollo/client';

export const QUERY_CMS_PAGE = gql`
  query cmsPage($url: String!) {
    cmsPage(url: $url) {
      layout
      title
      description
      meta_title
      meta_description
    }
  }
`;

/**
 * A helpful CMS page query shape, separated to avoid import
 * loops/cycles
 */
const queryCMSPage = (url) => ({
  query: QUERY_CMS_PAGE,
  variables: { url },
});

export default queryCMSPage;
