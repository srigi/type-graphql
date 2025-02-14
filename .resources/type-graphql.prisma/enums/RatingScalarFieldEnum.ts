import * as TypeGraphQL from 'type-graphql';

export enum RatingScalarFieldEnum {
  id = 'id',
  publicId = 'publicId',
  score = 'score',
  createdAt = 'createdAt',
  movieId = 'movieId',
}
TypeGraphQL.registerEnumType(RatingScalarFieldEnum, {
  name: 'RatingScalarFieldEnum',
  description: undefined,
});
