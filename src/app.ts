import express, { Application } from "express";
import dotenv from "dotenv";
// Route imports
import users from "./routes/user";
import { morganMiddleware } from "./common/logging/log";
dotenv.config();

export default function (): Application {
  const app: Application = express();
  /** Apply logging middleware for request tracing */
  app.use(morganMiddleware);

  /** Enable boilerplate controller with a url path prefix of users */
  app.use("/users", users());

  return app;
}
