import { createPubSub } from '@graphql-yoga/subscription';

import type { Topic as UserReview, NotificationPayload as UserReviewNotificationPayload } from '~/UserReview/UserReviewNotification';

export const pubSub = createPubSub<{
  [UserReview.NOTIFICATIONS]: [string, UserReviewNotificationPayload];
}>();
