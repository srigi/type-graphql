import { Field, GraphQLTimestamp, ObjectType } from 'type-graphql';

@ObjectType('User')
export class User {
  @Field(() => String)
  publicId!: string;

  @Field(() => String)
  username!: string;

  @Field(() => GraphQLTimestamp)
  createdAt!: Date;
}
