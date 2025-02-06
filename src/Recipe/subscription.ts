import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';

import { Recipe } from './Recipe';

export const enum Topic {
  NOTIFICATIONS = 'NOTIFICATIONS',
}

export enum PayloadType {
  NEW_RECIPE,
  RECIPE_UPDATED,
  RECIPE_DELETED,
}

export interface Payload {
  type: PayloadType;
  issuedAt: Date;
  recipe?: Recipe;
}

registerEnumType(PayloadType, { name: 'PayloadType' });

@ObjectType()
export class RecipeNotification {
  @Field((type) => PayloadType)
  type!: PayloadType;

  @Field((type) => Date)
  issuedAt!: Date;

  @Field((type) => Recipe)
  recipe!: Recipe;
}
