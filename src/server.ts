import 'reflect-metadata';
import { createYoga } from 'graphql-yoga';
import http from 'node:http';
import path from 'node:path';
import { buildSchema } from 'type-graphql';

import { RecipeResolver } from '~/recipe/resolver';
import { pubSub } from '~/pubsub';

const port = +(process.env.PORT || 3000);

async function createServer() {
  const schema = await buildSchema({
    emitSchemaFile: path.resolve(__dirname, '../.out/schema.graphql'),
    pubSub,
    resolvers: [RecipeResolver],
  });

  const yoga = createYoga({ graphqlEndpoint: '/graphql', schema });

  return http.createServer(yoga);
}

createServer().then((server) => {
  server.listen(port, '0.0.0.0', () => console.log(`Server is running on port ${port}`));
});
