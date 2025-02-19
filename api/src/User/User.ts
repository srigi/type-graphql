import { Field, GraphQLTimestamp, ObjectType } from 'type-graphql';

@ObjectType('User')
export class User {
  @Field((type) => String)
  publicId!: string;

  @Field((type) => String)
  username!: string;

  @Field((type) => GraphQLTimestamp)
  createdAt!: Date;
}
