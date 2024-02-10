import express, { Express } from "express";
import dotenv from "dotenv";
// Route imports
import users from "./routes/user";

dotenv.config();

main();

function main() {
  try {
    const app: Express = express();
    const port = process.env.PORT || 8080;

    // Enable boilerplate controller with a url path prefix of users
    app.use("/users", users);

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (ex) {
    console.error(ex);
  }
}
