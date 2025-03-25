import { ArgumentValidationError, Authorized, Ctx, Resolver, Mutation, Arg } from 'type-graphql';

import { Context } from '~/Auth/Context';
import { Prisma } from '~prisma/client';
import { prisma } from '~/lib/db';
import { getRandomString } from '~/lib/utils';
import { AddReviewInput } from '../inputs/AddReview';
import { UserReview } from '../UserReview';

@Resolver(UserReview)
export class UserReviewAddReviewResolver {
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
      return await prisma.userReview.create({
        data: {
          publicId: getRandomString(9),
          movieId: movie.id,
          userId: ctx.user!.id,
          score,
          text,
        },
      });
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
}
