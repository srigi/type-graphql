import { Field, ObjectType } from 'type-graphql';

import { Movie } from '~/Movie/Movie';
import { UserReview } from './UserReview';

export const enum Topic {
  NOTIFICATIONS = 'NOTIFICATIONS',
}

export interface NotificationPayload {
  publishedAt: Date;
  userReview: UserReview;
}

@ObjectType()
export class UserReviewNotification {
  @Field((type) => Date)
  publishedAt!: Date;

  @Field((type) => Date)
  type!: string;

  @Field((type) => UserReview)
  userReview!: UserReview;
}
