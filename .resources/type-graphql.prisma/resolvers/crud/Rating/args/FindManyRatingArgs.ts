import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { RatingOrderByWithRelationInput } from '../../../inputs/RatingOrderByWithRelationInput';
import { RatingWhereInput } from '../../../inputs/RatingWhereInput';
import { RatingWhereUniqueInput } from '../../../inputs/RatingWhereUniqueInput';
import { RatingScalarFieldEnum } from '../../../../enums/RatingScalarFieldEnum';

@TypeGraphQL.ArgsType()
export class FindManyRatingArgs {
  @TypeGraphQL.Field((_type) => RatingWhereInput, {
    nullable: true,
  })
  where?: RatingWhereInput | undefined;

  @TypeGraphQL.Field((_type) => [RatingOrderByWithRelationInput], {
    nullable: true,
  })
  orderBy?: RatingOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field((_type) => RatingWhereUniqueInput, {
    nullable: true,
  })
  cursor?: RatingWhereUniqueInput | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  take?: number | undefined;

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: true,
  })
  skip?: number | undefined;

  @TypeGraphQL.Field((_type) => [RatingScalarFieldEnum], {
    nullable: true,
  })
  distinct?: Array<'id' | 'publicId' | 'score' | 'createdAt' | 'movieId'> | undefined;
}
