import 'reflect-metadata';
import path from 'node:path';
import { buildSchema } from 'type-graphql';

import { env } from '~/lib/env';
import { authChecker } from '~/Auth/authChecker';
import { SignInResolver } from '~/Auth/resolvers/SignInResolver';
import { SignOutResolver } from '~/Auth/resolvers/SignOutResolver';
import { WhoamiResolver } from '~/Auth/resolvers/WhoamiResolver';
import { MovieResolver } from '~/Movie/resolvers/MovieResolver';
import { MovieFiguresResolver } from '~/Movie/resolvers/MovieFiguresResolver';
import { MovieImageResolver } from '~/Movie/resolvers/MovieImageResolver';
import { MovieUserReviewsResolver } from '~/Movie/resolvers/MovieUserReviewsResolver';
import { UserResolver } from '~/User/resolvers/UserResolver';
import { AddUserReviewResolver } from '~/UserReview/resolvers/AddUserReviewResolver';
import { UserReviewUserResolver } from '~/UserReview/resolvers/UserReviewUserResolver';
import { pubSub } from '~/pubsub';

async function createSchema() {
  return buildSchema({
    authChecker,
    ...(env.API_SCHEMA_NOEMIT == null && { emitSchemaFile: path.resolve(__dirname, '../.out/schema.graphql') }),
    pubSub,
    resolvers: [
      SignInResolver,
      SignOutResolver,
      WhoamiResolver,
      MovieResolver,
      MovieFiguresResolver,
      MovieImageResolver,
      MovieUserReviewsResolver,
      UserResolver,
      AddUserReviewResolver,
      UserReviewUserResolver,
    ],
  });
}

export const schemaPromise = createSchema();
