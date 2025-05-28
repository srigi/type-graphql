import { Field, ObjectType, registerEnumType } from 'type-graphql';

export enum UserTypingEvent {
  STARTED = 'started',
  STOPPED = 'stopped',
}
registerEnumType(UserTypingEvent, {
  name: 'UserTypingEvent',
  description: 'The type of user typing event',
});

export interface UserTypingNotificationPayload {
  publishedAt: Date;
  moviePublicId: string;
  userPublicId: string;
  username: string;
  event: UserTypingEvent;
}

@ObjectType()
export class UserTypingNotification {
  @Field(() => Date)
  publishedAt!: Date;

  @Field(() => String)
  moviePublicId!: string;

  @Field(() => String)
  userPublicId!: string;

  @Field(() => String)
  username!: string;

  @Field(() => UserTypingEvent)
  event!: UserTypingEvent;
}
