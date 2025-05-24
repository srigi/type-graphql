import { FieldResolver, Resolver, Root } from 'type-graphql';

import { prisma } from '~/lib/db';
import { Movie } from '../Movie';
import { MovieFigure } from '../MovieFigure';

@Resolver(Movie)
export class MovieFiguresResolver {
  @FieldResolver((returns) => [MovieFigure])
  async figures(@Root() movie: Movie): Promise<MovieFigure[]> {
    const figures = await prisma.figure.findMany({
      where: {
        movieFigure: {
          some: {
            movie: { publicId: movie.publicId },
          },
        },
      },
      include: {
        movieFigure: {
          where: { movie: { publicId: movie.publicId } },
          select: { role: true },
        },
      },
    });

    return figures.map((f) => ({ ...f, role: f.movieFigure[0].role }));
  }
}
