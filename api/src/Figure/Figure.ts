import { Field, ObjectType } from 'type-graphql';

import { FigureMovie } from './FigureMovie';

@ObjectType('Figure')
export class Figure {
  @Field(() => String)
  publicId!: string;

  @Field(() => String)
  slug!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  birthday!: string;

  @Field(() => String)
  country!: string;

  @Field(() => [FigureMovie], { nullable: true })
  movies?: FigureMovie[];
}
