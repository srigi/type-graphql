import { Field, ObjectType } from 'type-graphql';

import { UserReview } from '~/UserReview/UserReview';

export interface UserReviewNotificationPayload {
  publishedAt: Date;
  userReview: UserReview;
}

@ObjectType()
export class UserReviewNotification {
  @Field(() => Date)
  publishedAt!: Date;

  @Field(() => Date)
  type!: string;

  @Field(() => UserReview)
  userReview!: UserReview;
}
