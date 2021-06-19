import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Home() {
  return (
    <div className="c-main">
      <div className="container-fluid">
        <h1>
          <FormattedMessage
            id="shredindex.app.TITLE"
            defaultMessage="Shred Index"
          />
        </h1>
        <p>
          <FormattedMessage
            id="shredindex.app.SUBTITLE"
            defaultMessage="Live your best adventure lifestyle"
          />
        </p>
      </div>
    </div>
  );
}
