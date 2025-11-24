// src/server.ts
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

import { createServer } from "http";
import express from "express";
import cors from "cors";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/index";
import connectDB from "./app/config/db";

async function startServer() {
  await connectDB();

  const app = express();
  app.use(cors());

  const yoga = createYoga({
    schema,
    graphqlEndpoint: "/graphql",
    graphiql: true, // built-in GraphiQL
  });

  const server = createServer(yoga);

  server.listen(4000, () => {
    console.log("🚀 GraphQL Yoga running at http://localhost:4000/graphql");
  });
}

startServer();
