import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createServer } from "http";
import mongoose from "mongoose";
import { createYoga } from "graphql-yoga";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import { schema } from "./graphql/index";
import connectDB from "./app/config/db";

async function start() {
  const app = express();
  app.use(cors());

  const yoga = createYoga({
    schema,
    graphqlEndpoint: "/graphql",
    context: ({ request }) => {
      const auth = request.headers.get("authorization") || "";
      const token = auth.replace("Bearer ", "");

      let userId = null;
      if (token) {
        try {
          const decoded = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
          );
          userId = decoded.id;
        } catch {}
      }
      return { userId };
    },
  });

  const httpServer = createServer(app);

  // Attach GraphQL endpoint
  app.use("/graphql", yoga);

  // Setup WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

 useServer(
  {
    schema,
    context: (ctx) => {
      // connectionParams may be any, so cast safely
      const auth = (ctx.connectionParams as { Authorization?: string })?.Authorization || "";
      const token = auth.replace("Bearer ", ""); // ✅ now TypeScript knows it's a string

      let userId = null;
      if (token) {
        try {
          const decoded = JSON.parse(
            Buffer.from(token.split(".")[1], "base64").toString()
          );
          userId = decoded.id;
        } catch {}
      }
      return { userId };
    },
  },
  wsServer
);


  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
    console.log(`📡 WebSocket subscriptions at ws://localhost:${PORT}/graphql`);
  });

  await connectDB();
}

start();
