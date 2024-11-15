import React from 'react';
import Head from 'next/head';

interface FaviconProps {
  title?: string;
}

const Favicon = ({ title = 'Shred Index' }: FaviconProps) => {
  return (
    <Head>
      <link
        rel="icon"
        type="image/svg+xml"
        href="/images/shredindex-favicon.svg"
      />
      {/* Fallback for browsers that don't support SVG favicons */}
      <link
        rel="alternate icon"
        type="image/png"
        href="/images/shredindex-favicon.svg"
      />
      <meta name="application-name" content={title} />
      <meta name="theme-color" content="#1d2e39" />
    </Head>
  );
};

export default Favicon;
