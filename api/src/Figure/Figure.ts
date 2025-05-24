import { Field, ObjectType } from 'type-graphql';

@ObjectType('Figure')
export class Figure {
  @Field((type) => String)
  publicId!: string;

  @Field((type) => String)
  slug!: string;

  @Field((type) => String)
  name!: string;

  @Field((type) => String)
  birthday!: string;

  @Field((type) => String)
  country!: string;
}
