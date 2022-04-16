import { useQuery } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import queryCMSPage from '../../utility/query-cms-page';
import ViewContext from '../ViewContext/ViewContext';

/**
 * A layout renderer that fetches metadata and layout data from the CMS, to
 * render the corresponding React elements (based on the `layouts` map in this
 * file)
 *
 * @param url e.g /url-segment/:url_parameter
 */
const DynamicLayout = ({ url }) => {
  const { layouts } = useContext(ViewContext);
  const { query, variables } = queryCMSPage(url);
  const { loading, error, data } = useQuery(
    query,
    {
      variables,
    },
  );

  if (loading || error) {
    return null;
  }

  const { cmsPage } = data;

  /* istanbul ignore if */
  if (!cmsPage) {
    // eslint-disable-next-line no-console
    console.warn('404 Layout not found');
    return null;
  }

  const { cmsPage: { layout, meta_title, meta_description } } = data;

  const Component = layouts[layout]; // React will warn us if this isn't a valid component

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{ meta_title }</title>
        <meta name="description" content={meta_description} />
      </Helmet>
      <Component />
    </>
  );
};

DynamicLayout.propTypes = {
  url: PropTypes.string.isRequired,
};

export default DynamicLayout;
