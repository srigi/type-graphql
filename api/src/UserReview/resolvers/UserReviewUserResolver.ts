import { FieldResolver, Resolver, Root } from 'type-graphql';

import { prisma } from '~/lib/db';
import { User } from '~/User/User';
import { UserReview } from '../UserReview';

@Resolver(UserReview)
export class UserReviewUserResolver {
  @FieldResolver(() => User)
  async user(@Root() userReview: UserReview): Promise<User> {
    return prisma.userReview
      .findUniqueOrThrow({
        where: { publicId: userReview.publicId },
      })
      .user();
  }
}
