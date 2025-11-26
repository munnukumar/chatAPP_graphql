import { makeExecutableSchema } from "@graphql-tools/schema";

import { authTypeDefs } from "../app/auth/auth.schema.ts";
import { userTypeDefs } from "../app/user/user.schema.ts";
import { chatTypeDefs } from "../app/chat/chat.schema.ts";

import { authResolvers } from "../app/auth/auth.resolver.ts";
import { userResolvers } from "../app/user/user.resolver.ts";
import { chatResolvers } from "../app/chat/chat.resolver.ts";

export const schema = makeExecutableSchema({
  typeDefs: [
    `
      type Query {
        _empty: String
      }

      type Mutation {
        _empty: String
      }

      type Subscription {
        _empty: String
      }
    `,
    authTypeDefs,
    userTypeDefs,
    chatTypeDefs,
  ],

  resolvers: [
    {
      Query: {},
      Mutation: {},
      Subscription: {},
    },
    authResolvers,
    userResolvers,
    chatResolvers,
  ],
});
