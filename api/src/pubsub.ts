import { createPubSub } from '@graphql-yoga/subscription';

import type { Topic as UserReview } from '~/UserReview/notifications/Topic';
import type { UserReviewNotificationPayload } from '~/UserReview/notifications/UserReviewNotification';
import type { UserTypingNotificationPayload } from '~/UserReview/notifications/UserTypingNotification';

export const pubSub = createPubSub<{
  [UserReview.NOTIFICATIONS]: [string, UserReviewNotificationPayload];
  [UserReview.USER_TYPING]: [string, UserTypingNotificationPayload];
}>();
