import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { CreateOneRatingArgs } from './args/CreateOneRatingArgs';
import { Rating } from '../../../models/Rating';
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Rating)
export class CreateOneRatingResolver {
  @TypeGraphQL.Mutation((_returns) => Rating, {
    nullable: false,
  })
  async createOneRating(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateOneRatingArgs,
  ): Promise<Rating> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).rating.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
