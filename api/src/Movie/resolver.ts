import type { GraphQLResolveInfo } from 'graphql';
import { Args, ArgumentValidationError, FieldResolver, Info, Query, Resolver, Root } from 'type-graphql';

import { prisma } from '~/lib/db';
import { transformCountFieldIntoSelectRelationsCount, transformInfoIntoPrismaArgs } from '~/lib/gqlHelpers';
import { RangeArgs } from '~/common/args.range';
import { Movie } from './Movie';
import { UserReview } from '~/UserReview/UserReview';
import { FindMovieArgs } from './args.findMovie';

@Resolver(Movie)
export class MovieResolver {
  @Query((returns) => [Movie])
  async movies(@Args(() => RangeArgs) { skip, take }: RangeArgs): Promise<Movie[]> {
    return (await prisma.movie.findMany({ skip, take: take || 25, orderBy: { releasedIn: 'desc' } })).map((movie) =>
      Object.assign(new Movie(), movie),
    );
  }

  @Query((returns) => Movie, { nullable: true })
  async movie(@Args(() => FindMovieArgs) { publicId }: FindMovieArgs, @Info() info: GraphQLResolveInfo): Promise<Movie | undefined> {
    const { _count } = transformInfoIntoPrismaArgs(info);

    const movie = await prisma.movie.findUnique({
      omit: { id: true },
      where: { publicId },
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
    if (movie == null) {
      throw new ArgumentValidationError([{ property: 'withPublicId', constraints: { presence: 'Movie not found' } }]);
    }

    return Object.assign(new Movie(), movie);
  }

  @FieldResolver((type) => [UserReview])
  async userReviews(@Root() movie: Movie, @Info() info: GraphQLResolveInfo): Promise<Omit<UserReview, 'movie' | 'user'>[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);

    return prisma.userReview.findMany({
      where: { movie: { publicId: movie.publicId } },
      orderBy: { createdAt: 'desc' },
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
