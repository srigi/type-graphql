import type { GraphQLResolveInfo } from 'graphql';
import { Args, Info, Query, Resolver } from 'type-graphql';

import { prisma } from '~/lib/db';
import { transformCountFieldIntoSelectRelationsCount, transformInfoIntoPrismaArgs } from '~/lib/gqlHelpers';
import { RangeArgs } from '~/common/args/Range';
import { FindByIdentifierArgs } from '~/common/args/FindByIdentifier';
import { validateAndSelectIdentifier } from '~/common/validators/args';
import { validateEntityFound } from '~/common/validators/entities';
import { Movie } from '../Movie';

@Resolver(Movie)
export class MovieResolver {
  @Query(() => [Movie])
  async movies(@Args(() => RangeArgs) { skip, take }: RangeArgs): Promise<Movie[]> {
    return await prisma.movie.findMany({ skip, take: take || 25, orderBy: { releasedIn: 'desc' } });
  }

  @Query(() => Movie, { nullable: true })
  async movie(@Args(() => FindByIdentifierArgs) args: FindByIdentifierArgs, @Info() info: GraphQLResolveInfo): Promise<Movie | undefined> {
    const condition = validateAndSelectIdentifier(args);
    const { _count } = transformInfoIntoPrismaArgs(info);

    const movie = await prisma.movie.findUnique({
      omit: { id: true },
      where: condition,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });

    validateEntityFound(movie, condition, 'Movie');

    return movie;
  }
}
