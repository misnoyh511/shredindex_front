import React from 'react';
import { Helmet } from 'react-helmet';
import { layouts } from '../../pages/_app';

interface DynamicLayoutProps {
  url: string;
  layout?: string;
  headerMenuItems?: unknown[];
  footerMenuItems?: unknown[];
}

const DynamicLayout: React.FC<DynamicLayoutProps> = ({
  url,
  layout,
  headerMenuItems,
  footerMenuItems,
}) => {
  const Component = layouts[layout];

  if (!Component) {
    console.warn(`Layout "${layout}" not found`);
    return null;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Shred Index</title>
        <meta name="description" content="Shred Index - Snow resort rankings" />
      </Helmet>
      <Component
        url={url}
        headerMenuItems={headerMenuItems}
        footerMenuItems={footerMenuItems}
      />
    </>
  );
};

export default DynamicLayout;
