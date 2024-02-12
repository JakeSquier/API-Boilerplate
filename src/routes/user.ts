import UserController from "../controllers/user";
import express from "express";

const router = express.Router();
const Controller = new UserController();

// Enable getAllUsers endpoint
router.get("/", Controller.getAllUsers);
// Enable getRandomUser endpoint
router.get("/random", Controller.getRandomUser);
// Enable getUserByName endpoint
router.get("/getByName/:name", Controller.getUserByName);

export default router;
