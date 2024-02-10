import { Request, Response } from "express";
import getUserData from "../models/user";
/**
 * This file represents a boilerplate controller. Functions within this controller utilize
 * a public API that provides data on public API's (comical). Follow this outline/pattern
 * for other controllers. As it adhears to the Three-layer app architecture ruleset
 */

/**
 * Function returns all user entries
 * @param req Express request object
 * @param res Express response object
 * @returns An array containing all entries
 */
async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const entries = await getUserData();
    res.json(entries);
  } catch (ex) {
    res.status(500).send(ex);
  }
}

/**
 * Function returns a random user entry
 * @param req Express request object
 * @param res Express response object
 * @returns A random entry
 */
async function getRandomUser(req: Request, res: Response): Promise<void> {
  try {
    const entries = await getUserData();
    const randomIdx = Math.floor(Math.random() * entries.length) + 1;
    res.json(entries[randomIdx]);
  } catch (ex) {
    res.status(500).send(ex);
  }
}

/**
 * Function returns a filtered set of users
 * @param req Express request object
 * @param res Express response object
 * @returns An entry
 */
async function getUserByName(req: Request, res: Response): Promise<void> {
  try {
    const name = req.params.name;
    const users = await getUserData();
    const user = users.filter(
      (user) => user.name.first.toLowerCase() === name.toLowerCase()
    );
    res.json(user);
  } catch (ex) {
    res.status(500).send(ex);
  }
}

export default {
  getAllUsers,
  getRandomUser,
  getUserByName
};
