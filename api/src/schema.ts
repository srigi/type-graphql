import 'reflect-metadata';
import path from 'node:path';
import { buildSchema } from 'type-graphql';

import { authChecker } from '~/Auth/authChecker';
import { SignInResolver } from '~/Auth/resolvers/SignInResolver';
import { MovieResolver } from '~/Movie/resolvers/MovieResolver';
import { MovieFiguresResolver } from '~/Movie/resolvers/MovieFiguresResolver';
import { MovieImageResolver } from '~/Movie/resolvers/MovieImageResolver';
import { MovieUserReviewsResolver } from '~/Movie/resolvers/MovieUserReviewsResolver';
import { AddUserReviewResolver } from '~/UserReview/resolvers/AddUserReviewResolver';
import { UserReviewUserResolver } from '~/UserReview/resolvers/UserReviewUserResolver';
import { pubSub } from '~/pubsub';

async function createSchema() {
  return buildSchema({
    authChecker,
    emitSchemaFile: path.resolve(__dirname, '../.out/schema.graphql'),
    pubSub,
    resolvers: [
      SignInResolver,
      MovieResolver,
      MovieFiguresResolver,
      MovieImageResolver,
      MovieUserReviewsResolver,
      AddUserReviewResolver,
      UserReviewUserResolver,
    ],
  });
}

export const schemaPromise = createSchema();
