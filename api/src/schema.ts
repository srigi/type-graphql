import 'reflect-metadata';
import path from 'node:path';
import { buildSchema } from 'type-graphql';

import { MovieResolver } from '~/Movie/resolvers/MovieResolver';
import { MovieFiguresResolver } from '~/Movie/resolvers/MovieFiguresResolver';
import { MovieImageResolver } from '~/Movie/resolvers/MovieImageResolver';
import { MovieUserReviewsResolver } from '~/Movie/resolvers/MovieUserReviewsResolver';
import { UserSignInResolver } from '~/User/resolvers/UserSignInResolver';
import { UserReviewAddReviewResolver } from '~/UserReview/resolvers/UserReviewAddReviewResolver';
import { UserReviewUserResolver } from '~/UserReview/resolvers/UserReviewUserResolver';
import { authChecker } from '~/Auth/authChecker';
import { pubSub } from '~/pubsub';

async function createSchema() {
  return buildSchema({
    authChecker,
    emitSchemaFile: path.resolve(__dirname, '../.out/schema.graphql'),
    pubSub,
    resolvers: [
      MovieResolver,
      MovieFiguresResolver,
      MovieImageResolver,
      MovieUserReviewsResolver,
      UserSignInResolver,
      UserReviewAddReviewResolver,
      UserReviewUserResolver,
    ],
  });
}

export const schemaPromise = createSchema();
