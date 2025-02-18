import type { GraphQLResolveInfo } from 'graphql';
import { FieldResolver, Info, Resolver, Root } from 'type-graphql';

import { prisma } from '~/lib/db';
import { transformCountFieldIntoSelectRelationsCount, transformInfoIntoPrismaArgs } from '~/lib/gqlHelpers';
import { Movie } from '~/Movie/Movie';
import { Rating } from './Rating';

@Resolver(Rating)
export class RatingResolver {
  @FieldResolver((type) => Movie)
  async movie(@Root() rating: Rating, @Info() info: GraphQLResolveInfo): Promise<Movie> {
    const { _count } = transformInfoIntoPrismaArgs(info);

    return prisma.rating
      .findUniqueOrThrow({
        where: { publicId: rating.publicId },
      })
      .movie({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
