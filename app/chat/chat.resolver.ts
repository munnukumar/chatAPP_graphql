import { createPubSub } from "graphql-yoga";
import ChatService from "./chat.service";

const pubSub = createPubSub<{
  NEW_MESSAGE: [
    {
      senderId: string;
      receiverId: string;
      text: string;
      createdAt: Date;
    }
  ];
}>();


interface SendMessageArgs {
  senderId: string;
  receiverId: string;
  text: string;
}

interface SubscriptionArgs {
  receiverId: string;
}

interface MessageArgs {
  senderId: string;
  receiverId: string;
}

export const ChatResolver = {
  Query: {
    messages: async (_: unknown, { senderId, receiverId }: MessageArgs) => {
      return ChatService.getMessages(senderId, receiverId);
    },
  },

  Mutation: {
    sendMessage: async (_: unknown, args: SendMessageArgs) => {
      const msg = await ChatService.sendMessage(args);

      const message = {
        senderId: msg.senderId!,
        receiverId: msg.receiverId!,
        text: msg.text!,
        createdAt: new Date(msg.createdAt!), // convert NativeDate -> JS Date
      };

      // ✅ Publish single object
      await pubSub.publish("NEW_MESSAGE", message);

      return message;
    },
  },

  Subscription: {
    newMessage: {
      subscribe: () => pubSub.subscribe("NEW_MESSAGE"),
      resolve: (
        payload: { senderId: string; receiverId: string; text: string; createdAt: Date },
        args: SubscriptionArgs
      ) => {
        if (payload.receiverId !== args.receiverId) return null;
        return payload;
      },
    },
  },
};

export default ChatResolver;
