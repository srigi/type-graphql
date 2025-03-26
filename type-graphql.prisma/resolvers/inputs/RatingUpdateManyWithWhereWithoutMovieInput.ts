import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { RatingScalarWhereInput } from '../inputs/RatingScalarWhereInput';
import { RatingUpdateManyMutationInput } from '../inputs/RatingUpdateManyMutationInput';

@TypeGraphQL.InputType('RatingUpdateManyWithWhereWithoutMovieInput', {})
export class RatingUpdateManyWithWhereWithoutMovieInput {
  @TypeGraphQL.Field((_type) => RatingScalarWhereInput, {
    nullable: false,
  })
  where!: RatingScalarWhereInput;

  @TypeGraphQL.Field((_type) => RatingUpdateManyMutationInput, {
    nullable: false,
  })
  data!: RatingUpdateManyMutationInput;
}
