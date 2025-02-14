import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { RatingUpdateManyWithoutMovieNestedInput } from '../inputs/RatingUpdateManyWithoutMovieNestedInput';
import { StringFieldUpdateOperationsInput } from '../inputs/StringFieldUpdateOperationsInput';

@TypeGraphQL.InputType('MovieUpdateInput', {})
export class MovieUpdateInput {
  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  publicId?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  slug?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  released?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => RatingUpdateManyWithoutMovieNestedInput, {
    nullable: true,
  })
  rating?: RatingUpdateManyWithoutMovieNestedInput | undefined;
}
