import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { UpsertOneRatingArgs } from './args/UpsertOneRatingArgs';
import { Rating } from '../../../models/Rating';
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Rating)
export class UpsertOneRatingResolver {
  @TypeGraphQL.Mutation((_returns) => Rating, {
    nullable: false,
  })
  async upsertOneRating(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpsertOneRatingArgs,
  ): Promise<Rating> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).rating.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
