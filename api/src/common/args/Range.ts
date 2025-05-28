import { Min, Max } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class RangeArgs {
  @Field(() => Int)
  @Min(0)
  skip: number = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take: number = 25;
}
