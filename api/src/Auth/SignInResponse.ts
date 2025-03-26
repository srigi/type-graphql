import { Field, ObjectType } from 'type-graphql';

import { User } from '~/User/User';

@ObjectType('SignInResponse')
export class SignInResponse {
  @Field((type) => String)
  authToken!: string;

  @Field((type) => User)
  user!: User;
}
