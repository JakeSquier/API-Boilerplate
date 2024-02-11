import express, { Application } from "express";
import dotenv from "dotenv";
// Route imports
import users from "./routes/user";

dotenv.config();

const app: Application = express();

// Enable boilerplate controller with a url path prefix of users
app.use("/users", users);

export default app;
