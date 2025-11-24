const chatSchema = /* GraphQL */ `
  type Message {
    id: ID!
    senderId: ID!
    receiverId: ID!
    text: String!
    createdAt: String!
  }

  type Query {
    messages(senderId: ID!, receiverId: ID!): [Message]
  }

  type Mutation {
    sendMessage(senderId: ID!, receiverId: ID!, text: String!): Message!
  }

  type Subscription {
    newMessage(receiverId: ID!): Message!
  }
`;

export default chatSchema;
