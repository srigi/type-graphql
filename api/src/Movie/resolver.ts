import type { GraphQLResolveInfo } from 'graphql';
import { Args, ArgumentValidationError, FieldResolver, Info, Query, Resolver, Root } from 'type-graphql';

import { RangeArgs } from '~/common/args.range';
import { prisma } from '~/lib/db';
import { transformCountFieldIntoSelectRelationsCount, transformInfoIntoPrismaArgs } from '~/lib/gqlHelpers';
import { Movie } from './Movie';
import { Rating } from '~/Rating/Rating';
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

  @FieldResolver((type) => [Rating])
  async ratings(@Root() movie: Movie, @Info() info: GraphQLResolveInfo): Promise<Omit<Rating, 'movie'>[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);

    return prisma.movie
      .findUniqueOrThrow({
        where: { publicId: movie.publicId },
      })
      .rating({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
