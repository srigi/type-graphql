import * as TypeGraphQL from 'type-graphql';
import type { GraphQLResolveInfo } from 'graphql';
import { CreateManyAndReturnRatingArgs } from './args/CreateManyAndReturnRatingArgs';
import { Rating } from '../../../models/Rating';
import { CreateManyAndReturnRating } from '../../outputs/CreateManyAndReturnRating';
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from '../../../helpers';

@TypeGraphQL.Resolver((_of) => Rating)
export class CreateManyAndReturnRatingResolver {
  @TypeGraphQL.Mutation((_returns) => [CreateManyAndReturnRating], {
    nullable: false,
  })
  async createManyAndReturnRating(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateManyAndReturnRatingArgs,
  ): Promise<CreateManyAndReturnRating[]> {
    const { _count } = transformInfoIntoPrismaArgs(info);
    return getPrismaFromContext(ctx).rating.createManyAndReturn({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
