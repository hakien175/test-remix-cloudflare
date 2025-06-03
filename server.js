import * as dotenv from 'dotenv';
import { createRequestHandler } from "@remix-run/express";
import express from "express";
import { broadcastDevReady } from "@remix-run/node";

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the build/client directory
app.use(express.static("build/client"));

// Handle all other requests with the Remix request handler
app.all(
  "*",
  createRequestHandler({
    build: await import("./build/server/index.js")
  })
);

// Start the server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(await import("./build/server/index.js"));
  }
});
