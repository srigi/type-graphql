import type { GraphQLResolveInfo } from 'graphql';
import { Args, ArgumentValidationError, Info, Query, Resolver } from 'type-graphql';

import { prisma } from '~/lib/db';
import { transformCountFieldIntoSelectRelationsCount, transformInfoIntoPrismaArgs } from '~/lib/gqlHelpers';
import { RangeArgs } from '~/common/args/Range';
import { Movie } from '../Movie';
import { FindMovieArgs } from '../args/FindMovie';

@Resolver(Movie)
export class MovieResolver {
  @Query((returns) => [Movie])
  async movies(@Args(() => RangeArgs) { skip, take }: RangeArgs): Promise<Movie[]> {
    return (await prisma.movie.findMany({ skip, take: take || 25, orderBy: { releasedIn: 'desc' } })).map((movie) =>
      Object.assign(new Movie(), movie),
    );
  }

  @Query((returns) => Movie, { nullable: true })
  async movie(@Args(() => FindMovieArgs) { publicId, slug }: FindMovieArgs, @Info() info: GraphQLResolveInfo): Promise<Movie | undefined> {
    if (!publicId && !slug) {
      throw new ArgumentValidationError([{ property: 'slug', constraints: { presence: 'Either a slug or publicId must be provided' } }]);
    }

    const { _count } = transformInfoIntoPrismaArgs(info);
    const condition = slug ? { slug } : { publicId };
    const movie = await prisma.movie.findUnique({
      omit: { id: true },
      where: condition,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
    if (movie == null) {
      throw new ArgumentValidationError([{ property: JSON.stringify(condition), constraints: { presence: 'Movie not found' } }]);
    }

    return Object.assign(new Movie(), movie);
  }
}
