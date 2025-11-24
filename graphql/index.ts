import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import chatSchema from "../app/chat/chat.schema";
import chatResolver from "../app/chat/chat.resolver";

export const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([chatSchema]),
  resolvers: mergeResolvers([chatResolver]),
});
