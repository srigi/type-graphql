import { render } from 'preact';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

import { App } from './App.tsx';
import './index.css';

const client = new Client({
  exchanges: [cacheExchange, fetchExchange],
  url: `${process.env.API_BASE_URL}/graphql`,
});

render(
  <Provider value={client}>
    <App />
  </Provider>,
  document.getElementById('app')!,
);
