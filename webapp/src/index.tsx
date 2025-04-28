import { createClient as createSSEClient } from 'graphql-sse';
import { render } from 'preact';
import { ErrorBoundary, LocationProvider, Router, Route } from 'preact-iso';
import { Client, Provider as UrqlProvider, cacheExchange, fetchExchange, subscriptionExchange } from '@urql/preact';

import { Layout } from '~/components/Layout';
import { NotFound } from '~/components/NotFound';
import { IndexPage } from './pages/index';
import { MovieDetailPage } from './pages/movieDetail';
import './index.css';

const sseClient = createSSEClient({
  url: `${process.env.API_BASE_URL}/graphql`,
});
const client = new Client({
  exchanges: [
    cacheExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: ({ query, variables }) => ({
        subscribe: (sink) => ({
          unsubscribe: sseClient.subscribe({ query: query!, variables }, sink),
        }),
      }),
    }),
  ],
  fetchOptions: { credentials: 'include' },
  url: `${process.env.API_BASE_URL}/graphql`,
});

render(
  <UrqlProvider value={client}>
    <LocationProvider>
      <ErrorBoundary>
        <Layout>
          <Router>
            <Route path="/movie/:slug" component={MovieDetailPage} />
            <Route path="/" component={IndexPage} />
            <Route default component={NotFound} />
          </Router>
        </Layout>
      </ErrorBoundary>
    </LocationProvider>
  </UrqlProvider>,
  document.getElementById('app')!,
);
