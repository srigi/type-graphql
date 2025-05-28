import { Field, ObjectType } from 'type-graphql';

import { Movie } from '~/Movie/Movie';

@ObjectType()
export class FigureMovie extends Movie {
  @Field(() => String)
  role!: string;
}
