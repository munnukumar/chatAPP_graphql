const typeDefs = /* GraphQL */ `
  type Message {
    id: ID!
    senderId: ID!
    receiverId: ID!
    text: String!
    createdAt: String!
  }

  input SendMessageInput {
    senderId: ID!
    receiverId: ID!
    text: String!
  }

  type Query {
    messages(senderId: ID!, receiverId: ID!): [Message!]!
  }

  type Mutation {
    sendMessage(input: SendMessageInput!): Message!
  }

  type Subscription {
    newMessage(receiverId: ID!): Message!
  }
`;

export default typeDefs;
