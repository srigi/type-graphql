import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { FindManyRatingArgs } from './args/FindManyRatingArgs';
import { Rating } from '../../../models/Rating';
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Rating)
export class FindManyRatingResolver {
  @TypeGraphQL.Query((_returns) => [Rating], {
    nullable: false,
  })
  async ratings(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyRatingArgs,
  ): Promise<Rating[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).rating.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
