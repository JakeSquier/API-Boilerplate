import controllers from "../controllers/user";
import express, { Router } from "express";

function userRoute(): Router {
  const router = express.Router();

  // Enable getAllEntries endpoint
  router.get("/", controllers.getAllUsers);
  // Enable getRandomEntry endpoint
  router.get("/random", controllers.getRandomUser);
  // Enable getEntryByName endpoint
  router.get("/getByName/:name", controllers.getUserByName);

  return router;
}

export default userRoute;
