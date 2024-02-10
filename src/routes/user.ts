import controllers from "../controllers/user";
import express from "express";

const router = express.Router();

// Enable getAllUsers endpoint
router.get("/", controllers.getAllUsers);
// Enable getRandomUser endpoint
router.get("/random", controllers.getRandomUser);
// Enable getUserByName endpoint
router.get("/getByName/:name", controllers.getUserByName);

export default router;
