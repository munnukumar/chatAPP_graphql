// src/schema/auth.schema.ts
import gql from "graphql-tag";

export const authTypeDefs = gql`
  type RegisterResponse {
    id: ID!
    name: String!
    email: String!
    message: String
  }

  type LoginResponse {
    accessToken: String!
    refreshToken: String! # Add this field to your schema
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
  getUsers: [User!]!
}

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Mutation {
    register(input: RegisterInput!): RegisterResponse!
    login(input: LoginInput!): LoginResponse!
  }

  extend type Query {
    me: User
  }
`;
