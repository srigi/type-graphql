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
  @Field((type) => Date)
  publishedAt!: Date;

  @Field((type) => String)
  moviePublicId!: string;

  @Field((type) => String)
  userPublicId!: string;

  @Field((type) => String)
  username!: string;

  @Field((type) => UserTypingEvent)
  event!: UserTypingEvent;
}
