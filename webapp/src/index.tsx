import { render } from 'preact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Client, Provider as UrqlProvider, cacheExchange, fetchExchange } from 'urql';

import { Layout } from '~/components/Layout';
import { NotFound } from '~/components/NotFound';
import { IndexPage } from './pages/index';
import { MovieDetailPage } from './pages/movieDetail';
import './index.css';

const client = new Client({
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: { credentials: 'include' },
  url: `${process.env.API_BASE_URL}/graphql`,
});

render(
  <UrqlProvider value={client}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/movie/:slug" element={<MovieDetailPage />} />
          <Route path="/movie" element={<NotFound />} />
          <Route path="/" element={<IndexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UrqlProvider>,
  document.getElementById('app')!,
);
