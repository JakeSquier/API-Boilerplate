import UserController from "../controllers/user";
import express, { Router } from "express";

export default function (): Router {
  const router = express.Router();
  const Controller = new UserController();
  // Enable getAllUsers endpoint
  router.get("/", Controller.getAllUsers);
  // Enable getRandomUser endpoint
  router.get("/random", Controller.getRandomUser);
  // Enable getUserByName endpoint
  router.get("/getByName/:name", Controller.getUserByName);

  return router;
}
