import { ChatService } from "./chat.service";
import { PubSub } from "graphql-subscriptions";

const service = new ChatService();
const pubsub = new PubSub();
const NEW_MESSAGE = "NEW_MESSAGE";

export const chatResolvers = {
  Query: {
    getMessages: async (_: any, { receiverId }: { receiverId: string }, { userId }: { userId: string }) => {
      if (!userId) throw new Error("Unauthorized");
      return service.getMessages(userId, receiverId);
    },
  },

  Mutation: {
    sendMessage: async (_: any, { receiverId, text }: { receiverId: string; text: string }, { userId }: { userId: string }) => {
      if (!userId) throw new Error("Unauthorized");

      const message = await service.sendMessage(userId, receiverId, text);

      // Publish to receiver's channel
      pubsub.publish(NEW_MESSAGE, {
        newMessage: message,
        receiverId,   // use for filtering
      });

      return message;
    },
  },

  Subscription: {
    newMessage: {
      subscribe: (_: any, { receiverId }: { receiverId: string }) =>
        pubsub.asyncIterator(NEW_MESSAGE),
      resolve: (payload: any, args: { receiverId: string }) => {
        // Only send to intended receiver
        if (payload.receiverId === args.receiverId) {
          return payload.newMessage;
        }
        return null;
      },
    },
  },
};
