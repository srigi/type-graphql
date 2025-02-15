import { render } from 'preact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Client, Provider as UrqlProvider, cacheExchange, fetchExchange } from 'urql';

import { Layout } from './ui/Layout';
import { IndexPage } from './pages';
import { MovieDetailPage } from './pages/movieDetail';
import './index.css';

const client = new Client({
  exchanges: [cacheExchange, fetchExchange],
  url: `${process.env.API_BASE_URL}/graphql`,
});

render(
  <UrqlProvider value={client}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/movie/:publicId" element={<MovieDetailPage />} />
          <Route path="/" element={<IndexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </UrqlProvider>,
  document.getElementById('app')!,
);
