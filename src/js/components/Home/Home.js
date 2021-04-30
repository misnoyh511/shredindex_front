import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Header from '../Header/Header';
import SidebarNav from '../Sidebar/SidebarNav';
import ViewContext from '../ViewContext/ViewContext';
import Footer from '../Footer/Footer';
import SupportBanner from '../SupportBanner/SupportBanner';
import FooterNav from '../FooterNav/FooterNav';

export default function Home() {
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <div className="c-app c-default-layout">
      <ViewContext.Provider value={{ toggleNav, setToggleNav }}>
        <SidebarNav toggle={toggleNav} setToggleNav={setToggleNav} />
        <div className="c-wrapper">
          <Header />
          <div className="c-body">
            <div className="c-main">
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
          <SupportBanner />
          <Footer />
          <FooterNav />
        </div>
      </ViewContext.Provider>
    </div>
  );
}
