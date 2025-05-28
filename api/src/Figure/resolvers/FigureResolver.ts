import { Args, Query, Resolver } from 'type-graphql';

import { prisma } from '~/lib/db';
import { FindByIdentifierArgs } from '~/common/args/FindByIdentifier';
import { validateAndSelectIdentifier } from '~/common/validators/args';
import { validateEntityFound } from '~/common/validators/entities';
import { Figure } from '../Figure';

@Resolver(Figure)
export class FigureResolver {
  @Query(() => Figure, { nullable: true })
  async figure(@Args(() => FindByIdentifierArgs) args: FindByIdentifierArgs): Promise<Figure | undefined> {
    const condition = validateAndSelectIdentifier(args);

    const figure = await prisma.figure.findUnique({
      omit: { id: true },
      where: condition,
    });

    validateEntityFound(figure, condition, 'Figure');
    return figure;
  }
}
