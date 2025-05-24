import type { GraphQLResolveInfo } from 'graphql';
import { Args, ArgumentValidationError, Info, Query, Resolver } from 'type-graphql';

import { prisma } from '~/lib/db';
import { Figure } from '../Figure';
import { FindFigureArgs } from '../args/FindFigure';

@Resolver(Figure)
export class FigureResolver {
  @Query((returns) => Figure, { nullable: true })
  async figure(@Args(() => FindFigureArgs) { publicId, slug }: FindFigureArgs, @Info() info: GraphQLResolveInfo): Promise<Figure | undefined> {
    if (!publicId && !slug) {
      throw new ArgumentValidationError([{ property: 'slug', constraints: { presence: 'Either a slug or publicId must be provided' } }]);
    }

    const condition = slug ? { slug } : { publicId };
    const figure = await prisma.figure.findUnique({
      omit: { id: true },
      where: condition,
    });
    if (figure == null) {
      throw new ArgumentValidationError([{ property: JSON.stringify(condition), constraints: { presence: 'Figure not found' } }]);
    }

    return figure;
  }
}
