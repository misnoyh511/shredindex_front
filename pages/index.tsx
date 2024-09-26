import React from 'react';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../lib/apollo-client';
import { QUERY_CMS_PAGES } from '../components/DynamicSwitch/DynamicSwitch';
import { QUERY_SETTINGS, QUERY_TEAM_MEMBERS } from '../components/Footer/Footer';
import { QUERY_STATIC_MENU } from '../hooks/useStaticMenu';
import { menuCode as footerMenuCode } from '../components/FooterMenuMain/FooterMenuMain';
import { menuCode as headerMenuCode } from '../components/HeaderMenuMain/HeaderMenuMain';
import queryCMSPage from '../utility/query-cms-page';
import DynamicLayout from '../components/DynamicLayout/DynamicLayout';

interface HomeProps {
  cmsPageData: unknown;
  headerMenuItems: unknown[];
  footerMenuItems: unknown[];
}

const Home: React.FC<HomeProps> = ({ cmsPageData, headerMenuItems, footerMenuItems }) => {
  if (!cmsPageData || !cmsPageData.cmsPage) return <div>Home page not found</div>;

  return (
    <DynamicLayout
      layout={cmsPageData.cmsPage.layout}
      url="/"
      headerMenuItems={headerMenuItems}
      footerMenuItems={footerMenuItems}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  try {
    const [
      cmsPageData,
      ,
      ,,
      { data: headerMenuData },
      { data: footerMenuData },
    ] = await Promise.all([
      apolloClient.query(queryCMSPage('/')),
      apolloClient.query({ query: QUERY_CMS_PAGES }),
      apolloClient.query({ query: QUERY_SETTINGS }),
      apolloClient.query({ query: QUERY_TEAM_MEMBERS }),
      apolloClient.query({
        query: QUERY_STATIC_MENU,
        variables: { code: headerMenuCode },
      }),
      apolloClient.query({
        query: QUERY_STATIC_MENU,
        variables: { code: footerMenuCode },
      }),
    ]);

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        cmsPageData: cmsPageData.data,
        headerMenuItems: headerMenuData?.staticMenu?.items || [],
        footerMenuItems: footerMenuData?.staticMenu?.items || [],
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: {}, revalidate: 60 };
  }
};

export default Home;
