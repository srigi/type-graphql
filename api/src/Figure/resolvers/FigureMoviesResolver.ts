import { FieldResolver, Resolver, Root, Args, ArgumentValidationError } from 'type-graphql';

import { prisma } from '~/lib/db';
import { Figure } from '../Figure';
import { FigureMovie } from '../FigureMovie';
import { OrderByArgs } from '../args/OrderBy';

@Resolver(Figure)
export class FigureMoviesResolver {
  @FieldResolver(() => [FigureMovie])
  async movies(@Root() figure: Figure, @Args(() => OrderByArgs) { orderBy }: OrderByArgs = {}): Promise<FigureMovie[]> {
    if (orderBy) {
      const [field, direction] = orderBy.split('.');
      if (direction !== 'asc' && direction !== 'desc') {
        throw new ArgumentValidationError([
          { property: 'orderBy', constraints: { enum: `Direction must be either asc or desc, but received ${direction}` } },
        ]);
      }
    }

    const movies = await prisma.movie.findMany({
      where: {
        movieFigure: {
          some: {
            figure: { publicId: figure.publicId },
          },
        },
      },
      include: {
        movieFigure: {
          where: { figure: { publicId: figure.publicId } },
          select: { role: true },
        },
      },
      orderBy: orderBy ? { [orderBy.split('.')[0]]: orderBy.split('.')[1] } : undefined,
    });

    return movies.map((m) => ({ ...m, role: m.movieFigure[0].role }));
  }
}
