import { gql } from "apollo-server-express";

export const chatTypeDefs = gql`
  type Message {
    id: ID!
    senderId: String!
    receiverId: String!
    text: String!
    createdAt: String!
  }

  extend type Query {
    getMessages(receiverId: String!): [Message]
  }

  extend type Mutation {
    sendMessage(receiverId: String!, text: String!): Message
  }

  extend type Subscription {
    newMessage(receiverId: String!): Message
  }
`;
