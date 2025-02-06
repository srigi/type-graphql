import { createPubSub } from '@graphql-yoga/subscription';

import type { Topic as RecipeNotificationTopic, Payload as RecipeNotificationPayload } from '~/recipe/subscription';

export const pubSub = createPubSub<{
  [RecipeNotificationTopic.NOTIFICATIONS]: [RecipeNotificationPayload];
}>();
