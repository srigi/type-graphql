import * as TypeGraphQL from 'type-graphql';

export enum MovieScalarFieldEnum {
  id = 'id',
  publicId = 'publicId',
  name = 'name',
  slug = 'slug',
  released = 'released',
}
TypeGraphQL.registerEnumType(MovieScalarFieldEnum, {
  name: 'MovieScalarFieldEnum',
  description: undefined,
});
