import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { Movie } from '../../../models/Movie';
import { Rating } from '../../../models/Rating';
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Rating)
export class RatingRelationsResolver {
  @TypeGraphQL.FieldResolver((_type) => Movie, {
    nullable: false,
  })
  async movie(@TypeGraphQL.Root() rating: Rating, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo): Promise<Movie> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx)
      .rating.findUniqueOrThrow({
        where: {
          id: rating.id,
        },
      })
      .movie({
        ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      });
  }
}
