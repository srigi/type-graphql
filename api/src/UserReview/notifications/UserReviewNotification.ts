import { Field, ObjectType } from 'type-graphql';

import { UserReview } from '~/UserReview/UserReview';

export interface UserReviewNotificationPayload {
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
