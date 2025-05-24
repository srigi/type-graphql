import { Field, ObjectType } from 'type-graphql';

import { FigureMovie } from './FigureMovie';

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

  @Field((type) => [FigureMovie], { nullable: true })
  movies?: FigureMovie[];
}
