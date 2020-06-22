import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import langEn from './lang/en.json';

const t = {
  en: langEn,
};

const locale = 'en';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.GRAPHQL_URI,
});

const client = new ApolloClient({
  cache,
  link,
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <IntlProvider locale={locale} message={t[locale]}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </IntlProvider>
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
