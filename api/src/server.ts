import { createYoga } from 'graphql-yoga';
import http from 'node:http';

import { schemaPromise } from './schema';

const port = Number(process.env.PORT || 3001);

schemaPromise
  .then((schema) => {
    return http.createServer(
      createYoga({
        graphqlEndpoint: '/graphql',
        healthCheckEndpoint: '/health',
        schema,
      }),
    );
  })
  .then((server) => {
    server.listen(port, '0.0.0.0', () => console.log(`Server is running on port ${port}`));
  });
