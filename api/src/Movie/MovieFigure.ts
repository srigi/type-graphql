import { Field, ObjectType } from 'type-graphql';

import { Figure } from '~/Figure/Figure';

@ObjectType('MovieFigure')
export class MovieFigure extends Figure {
  @Field(() => String)
  role!: string;
}
