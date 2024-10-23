import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600;700;800;900&family=Roboto:wght@100;300;500;700;900&family=Plus+Jakarta+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  );
};

export default Document;
