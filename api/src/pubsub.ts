import { createPubSub } from '@graphql-yoga/subscription';

//import type { Topic as RecipeNotificationTopic, Payload as RecipeNotificationPayload } from '~/Recipe/subscription';

export const pubSub = createPubSub<{
  //[RecipeNotificationTopic.NOTIFICATIONS]: [RecipeNotificationPayload];
}>();
