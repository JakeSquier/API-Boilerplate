/** Node packages */
import { describe, test, expect } from "vitest";
import { createRequest, createResponse } from "node-mocks-http";
/** Local imports */
import UserController from "../../controllers/user";
import { testUserName, User } from "../../models/user";

describe("Testing Get all Users controller", () => {
  const Controller = new UserController();

  test("Controller should return a 200 status", async () => {
    const request = createRequest({ method: "GET" });
    const response = createResponse();
    await Controller.getAllUsers(request, response);

    expect(response.statusCode).toBe(200);
  });
});

describe("Testing Get random user controller", () => {
  const Controller = new UserController();

  test("Controller should return a 200 status", async () => {
    const request = createRequest({ method: "GET" });
    const response = createResponse();
    await Controller.getRandomUser(request, response);

    expect(response.statusCode).toBe(200);
  });
});

describe("Testing Get user by name controller", () => {
  const Controller = new UserController();

  test("Controller should return a 200 status", async () => {
    const request = createRequest({
      method: "GET",
      params: { name: testUserName }
    });
    const response = createResponse();
    await Controller.getUserByName(request, response);
    const data = response._getJSONData() as User[];

    expect(response.statusCode).toBe(200);
    expect(data.length).toBeGreaterThan(0);
  });
});
