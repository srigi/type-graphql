import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { RatingCreateManyInput } from '../../../inputs/RatingCreateManyInput';

@TypeGraphQL.ArgsType()
export class CreateManyAndReturnRatingArgs {
  @TypeGraphQL.Field((_type) => [RatingCreateManyInput], {
    nullable: false,
  })
  data!: RatingCreateManyInput[];
}
