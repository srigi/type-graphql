import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { RatingWhereInput } from '../../inputs/RatingWhereInput';

@TypeGraphQL.ArgsType()
export class MovieCountRatingArgs {
  @TypeGraphQL.Field((_type) => RatingWhereInput, {
    nullable: true,
  })
  where?: RatingWhereInput | undefined;
}
