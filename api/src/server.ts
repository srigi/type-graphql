import { createInlineSigningKeyProvider, extractFromCookie, extractFromHeader, useJWT } from '@graphql-yoga/plugin-jwt';
import { useCookies } from '@whatwg-node/server-plugin-cookies';
import { createYoga } from 'graphql-yoga';
import http from 'node:http';

import { env } from '~/lib/env';
import { schemaPromise } from './schema';

const port = Number(process.env.PORT || 3001);

schemaPromise
  .then((schema) => {
    return http.createServer(
      createYoga({
        graphqlEndpoint: '/graphql',
        graphiql: { useGETForQueries: false, method: 'POST' },
        healthCheckEndpoint: '/health',
        plugins: [
          useCookies(),
          useJWT({
            tokenLookupLocations: [extractFromCookie({ name: 'bearer' }), extractFromHeader({ name: 'authorization', prefix: 'Bearer' })],
            signingKeyProviders: [createInlineSigningKeyProvider(env.API_JWT_SECRET)],
            reject: {
              invalidToken: true,
              missingToken: false,
            },
            tokenVerification: {
              algorithms: ['HS256'],
              issuer: env.API_BASE_URL,
            },
          }),
        ],
        schema,
      }),
    );
  })
  .then((server) => {
    server.listen(port, '0.0.0.0', () => console.log(`Server is running on port ${port}`));
  });
