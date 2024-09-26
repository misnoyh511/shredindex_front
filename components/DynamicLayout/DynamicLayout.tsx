import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet';
import queryCMSPage from '../../utility/query-cms-page';
import { layoutsAtom, LayoutsType } from '../../atoms/layoutsType';

interface DynamicLayoutProps {
  url: string;
}

interface CMSPageData {
  cmsPage: {
    layout: string;
    meta_title: string;
    meta_description: string;
  };
}

/**
 * A layout renderer that fetches metadata and layout data from the CMS, to
 * render the corresponding React elements (based on the `layouts` map in the
 * layoutsAtom)
 *
 * @param url e.g /url-segment/:url_parameter
 */
const DynamicLayout: React.FC<DynamicLayoutProps> = ({ url }) => {
  const layouts = useRecoilValue<LayoutsType>(layoutsAtom);
  const { query, variables } = queryCMSPage(url);
  const { loading, error, data } = useQuery<CMSPageData>(
    query,
    {
      variables,
    },
  );

  if (loading || error) {
    return null;
  }

  const { cmsPage } = data || {};

  /* istanbul ignore if */
  if (!cmsPage) {
    // eslint-disable-next-line no-console
    console.warn('404 Layout not found');
    return null;
  }

  const { layout, meta_title, meta_description } = cmsPage;

  const Component = layouts[layout]; // React will warn us if this isn't a valid component

  if (!Component) {
    console.warn(`Layout "${layout}" not found`);
    return null;
  }

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

export default DynamicLayout;
