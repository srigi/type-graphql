import { Field, ObjectType } from 'type-graphql';

import { User } from '~/User/User';

@ObjectType('SignInResponse')
export class SignInResponse {
  @Field(() => String)
  authToken!: string;

  @Field(() => User)
  user!: User;
}
