import {
  Arg,
  ArgumentValidationError,
  Authorized,
  Ctx,
  Mutation,
  Resolver,
  Root,
  Subscription,
  type SubscribeResolverData,
} from 'type-graphql';

import { Context } from '~/Auth/Context';
import { prisma } from '~/lib/db';
import { Prisma } from '~prisma/client';
import { getRandomString } from '~/lib/utils';
import { pubSub } from '~/pubsub';
import { AddReviewInput } from '../inputs/AddReview';
import { UserReview } from '../UserReview';
import { NotificationPayload, Topic, UserReviewNotification } from '../UserReviewNotification';

@Resolver(UserReview)
export class AddUserReviewResolver {
  @Authorized()
  @Mutation((returns) => UserReview)
  async addReview(
    @Arg('userReview', () => AddReviewInput) { moviePublicId, score, text }: AddReviewInput,
    @Ctx() ctx: Context,
  ): Promise<UserReview> {
    const movie = await prisma.movie.findFirst({ where: { publicId: moviePublicId } });
    if (movie == null) {
      throw new ArgumentValidationError([{ property: 'moviePublicId', constraints: { presence: 'Movie with given moviePublicId not found' } }]);
    }

    try {
      const userReview = await prisma.$transaction(async (tx) => {
        const row = await tx.userReview.create({
          data: {
            publicId: getRandomString(9),
            movieId: movie.id,
            userId: ctx.user!.id,
            score,
            text,
          },
        });

        await tx.$executeRaw`
          UPDATE "Movie"
          SET "avgScore" = (
            SELECT ROUND(AVG("score"), 1)
            FROM "UserReview"
            WHERE "movieId" = ${movie.id}
          )
          WHERE "id" = ${movie.id}
        `;

        return row;
      });
      pubSub.publish(Topic.NOTIFICATIONS, moviePublicId, { publishedAt: new Date(), userReview });

      return userReview;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002' &&
        err.message.includes('Unique constraint failed on the fields: (`movieId`,`userId`)')
      ) {
        throw new ArgumentValidationError([
          { property: 'userId', constraints: { uniqueness: 'You already added user-review for this Movie' } },
        ]);
      }

      throw err;
    }
  }

  @Subscription((returns) => UserReviewNotification, {
    topics: Topic.NOTIFICATIONS,
    topicId: ({ args }: SubscribeResolverData<any, { moviePublicId: string }>) => args.moviePublicId,
  })
  userReviewAdded(@Arg('moviePublicId', () => String) moviePublicId: string, @Root() payload: NotificationPayload): UserReviewNotification {
    return { ...payload, type: 'userReviewAdded' };
  }
}
