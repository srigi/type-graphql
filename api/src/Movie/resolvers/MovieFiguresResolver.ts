import { FieldResolver, Resolver, Root } from 'type-graphql';

import { prisma } from '~/lib/db';
import { Figure } from '~/Figure/Figure';
import { Movie } from '../Movie';

@Resolver(Movie)
export class MovieFiguresResolver {
  @FieldResolver((returns) => [Figure])
  async figures(@Root() movie: Movie): Promise<Figure[]> {
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

    return figures.map((f) => Object.assign(new Figure(), f, { role: f.movieFigure[0].role }));
  }
}
