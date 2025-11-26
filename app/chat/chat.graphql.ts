const typeDefs = /* GraphQL */ `
  type Message {
    id: ID!
    senderId: ID!
    receiverId: ID!
    text: String!
    createdAt: String!
  }

  input SendMessageInput {
    receiverId: ID!
    text: String!
  }

  type Query {
    getMessages(receiverId: ID!): [Message!]!
  }

  type Mutation {
    sendMessage(input: SendMessageInput!): Message!
  }

  type Subscription {
    newMessage(receiverId: ID!): Message!
  }
`;

export default typeDefs;
