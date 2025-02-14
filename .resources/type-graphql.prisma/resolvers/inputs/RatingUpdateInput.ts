import * as TypeGraphQL from 'type-graphql';
import * as GraphQLScalars from 'graphql-scalars';
import { Prisma } from '../../../client';
import { DecimalJSScalar } from '../../scalars';
import { IntFieldUpdateOperationsInput } from '../inputs/IntFieldUpdateOperationsInput';
import { MovieUpdateOneRequiredWithoutRatingNestedInput } from '../inputs/MovieUpdateOneRequiredWithoutRatingNestedInput';
import { StringFieldUpdateOperationsInput } from '../inputs/StringFieldUpdateOperationsInput';

@TypeGraphQL.InputType('RatingUpdateInput', {})
export class RatingUpdateInput {
  @TypeGraphQL.Field((_type) => StringFieldUpdateOperationsInput, {
    nullable: true,
  })
  publicId?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  score?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => IntFieldUpdateOperationsInput, {
    nullable: true,
  })
  createdAt?: IntFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field((_type) => MovieUpdateOneRequiredWithoutRatingNestedInput, {
    nullable: true,
  })
  movie?: MovieUpdateOneRequiredWithoutRatingNestedInput | undefined;
}
