import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <script
          async
          src={'https://www.googletagmanager.com/gtag/js?id=G-KZ1ZQC1V1B'}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KZ1ZQC1V1B', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Preload fonts with highest priority */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"
          as="style"
        />
        {/* Establish early connections */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
        />

        {/* Load actual font styles */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />

        {/* Meta tags for performance */}
        <meta httpEquiv="x-dns-prefetch-control" content="on"/>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  );
};

export default Document;
