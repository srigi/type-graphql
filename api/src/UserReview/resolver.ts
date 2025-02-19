import type { GraphQLResolveInfo } from 'graphql';
import { FieldResolver, Info, Resolver, Root } from 'type-graphql';

import { prisma } from '~/lib/db';
import { User } from '~/User/User';
import { UserReview } from './UserReview';

@Resolver(UserReview)
export class UserReviewResolver {
  @FieldResolver((type) => User)
  async user(@Root() userReview: UserReview, @Info() info: GraphQLResolveInfo): Promise<Omit<User, 'userReviews'>> {
    return prisma.userReview
      .findUniqueOrThrow({
        where: { publicId: userReview.publicId },
      })
      .user();
  }
}
