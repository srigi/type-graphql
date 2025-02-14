import 'reflect-metadata';
import path from 'node:path';
import { buildSchema } from 'type-graphql';

import { MovieResolver } from '~/Movie/resolver';
import { RecipeResolver } from '~/Recipe/resolver';
import { pubSub } from '~/pubsub';

async function createSchema() {
  return buildSchema({
    emitSchemaFile: path.resolve(__dirname, '../.out/schema.graphql'),
    pubSub,
    resolvers: [MovieResolver, RecipeResolver],
  });
}

export const schemaPromise = createSchema();
