import { Request, Response } from "express";
import getUserData from "../models/user";
import logger from "../common/logging/log";
import { isProductionEnv } from "../common/environment";
import { safeGetErrorMessage } from "../common/logging/utilities";

export default class UserController {
  /**
   * Function returns all user entries
   * @param req Express request object
   * @param res Express response object
   * @returns An array containing all entries
   */
  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await getUserData();
      if (!users) {
        throw new Error("Server was unable to retrieve user data");
      }
      res.json(users);
    } catch (ex) {
      const safeError = !isProductionEnv()
        ? safeGetErrorMessage(ex, false)
        : undefined;

      logger.error("An unexpected error was encountered", safeError);
      res.status(500).send(safeError);
    }
  };

  /**
   * Function returns a random user entry
   * @param req Express request object
   * @param res Express response object
   * @returns A random entry
   */
  public getRandomUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await getUserData();
      if (!users) {
        throw new Error("Server was unable to retrieve user data");
      }
      const randomIdx = Math.floor(Math.random() * users.length) + 1;
      res.json(users[randomIdx]);
    } catch (ex) {
      const safeError = !isProductionEnv()
        ? safeGetErrorMessage(ex, false)
        : undefined;

      logger.error("An unexpected error was encountered", safeError);
      res.status(500).send(safeError);
    }
  };

  /**
   * Function returns a filtered set of users
   * @param req Express request object
   * @param res Express response object
   * @returns An entry
   */
  public getUserByName = async (req: Request, res: Response): Promise<void> => {
    try {
      const name = req.params.name;
      const users = await getUserData();
      if (!users) {
        throw new Error("Server was unable to retrieve user data");
      }
      const user = users.filter(
        (user) => user.name.first.toLowerCase() === name.toLowerCase()
      );

      res.json(user);
    } catch (ex) {
      const safeError = !isProductionEnv()
        ? safeGetErrorMessage(ex, false)
        : undefined;

      logger.error("An unexpected error was encountered", safeError);
      res.status(500).send(safeError);
    }
  };
}
