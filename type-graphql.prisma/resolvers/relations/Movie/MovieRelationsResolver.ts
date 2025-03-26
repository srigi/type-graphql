import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { Movie } from '../../../models/Movie';
import { Rating } from '../../../models/Rating';
import { MovieRatingArgs } from './args/MovieRatingArgs';
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Movie)
export class MovieRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => [Rating], {
    nullable: false,
  })
  async rating(
    @TypeGraphQL.Root() movie: Movie,
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: MovieRatingArgs,
  ): Promise<Rating[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .movie.findUniqueOrThrow({
        where: {
          id: movie.id,
        },
      })
      .rating({
        ...args,
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
