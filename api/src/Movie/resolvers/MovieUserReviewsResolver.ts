import type { GraphQLResolveInfo } from 'graphql';
import { FieldResolver, Info, Resolver, Root } from 'type-graphql';

import { prisma } from '~/lib/db';
import { transformCountFieldIntoSelectRelationsCount, transformInfoIntoPrismaArgs } from '~/lib/gqlHelpers';
import { Movie } from '../Movie';
import { UserReview } from '~/UserReview/UserReview';

@Resolver(Movie)
export class MovieUserReviewsResolver {
  @FieldResolver(() => [UserReview])
  async userReviews(@Root() movie: Movie, @Info() info: GraphQLResolveInfo): Promise<UserReview[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);

    return prisma.userReview.findMany({
      where: { movie: { publicId: movie.publicId } },
      orderBy: { createdAt: 'desc' },
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
