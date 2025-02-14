import { Args, ArgumentValidationError, Query, Resolver } from 'type-graphql';

import { RangeArgs } from '~/common/args.range';
import { prisma } from '~/lib/db';
import { Movie } from './Movie';
import { FindMovieArgs } from './args.findMovie';

@Resolver(Movie)
export class MovieResolver {
  @Query((returns) => [Movie])
  async movies(@Args(() => RangeArgs) { skip, take }: RangeArgs): Promise<Movie[]> {
    return (await prisma.movie.findMany({ skip, take })).map((movie) => Object.assign(new Movie(), movie));
  }

  @Query((returns) => Movie, { nullable: true })
  async movie(@Args(() => FindMovieArgs) args: FindMovieArgs): Promise<Movie | undefined> {
    if (args.withPublicId != null) {
      const movie = await prisma.movie.findUnique({
        omit: { id: true },
        where: { publicId: args.withPublicId },
      });
      if (movie == null) {
        throw new ArgumentValidationError([{ property: 'withPublicId', constraints: { presence: 'Movie not found' } }]);
      }

      return Object.assign(new Movie(), movie);
    }
    if (args.withSlug != null) {
      const movie = await prisma.movie.findUnique({
        omit: { id: true },
        where: { slug: args.withSlug },
      });
      if (movie == null) {
        throw new ArgumentValidationError([{ property: 'withSlug', constraints: { presence: 'Movie not found' } }]);
      }

      return Object.assign(new Movie(), movie);
    }
  }
}
