import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { RatingCreateManyMovieInput } from '../inputs/RatingCreateManyMovieInput';

@TypeGraphQL.InputType('RatingCreateManyMovieInputEnvelope', {})
export class RatingCreateManyMovieInputEnvelope {
  @TypeGraphQL.Field((_type) => [RatingCreateManyMovieInput], {
    nullable: false,
  })
  data!: RatingCreateManyMovieInput[];
}
