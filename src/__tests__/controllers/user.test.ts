/** Node packages */
import { describe, test, expect } from "vitest";
import { createRequest, createResponse } from "node-mocks-http";
/** Local imports */
import contollers from "../../controllers/user";
import getUserData, { User } from "../../models/user";

describe("Testing Get all Users controller", () => {
  test("Controller should return a 200 status", async () => {
    const request = createRequest({ method: "GET" });
    const response = createResponse();
    await contollers.getAllUsers(request, response);

    expect(response.statusCode).toBe(200);
  });
});

describe("Testing Get random user controller", () => {
  test("Controller should return a 200 status", async () => {
    const request = createRequest({ method: "GET" });
    const response = createResponse();
    await contollers.getRandomUser(request, response);

    expect(response.statusCode).toBe(200);
  });
});

describe("Testing Get user by name controller", () => {
  test("Controller should return a 200 status", async () => {
    const testName = "jane";
    const users = await getUserData();
    if (!users) {
      throw new Error("Test was unable to retrieve user data");
    }

    const user = users.filter(
      (user) => user.name.first.toLowerCase() == testName
    );

    const request = createRequest({
      method: "GET",
      params: { name: testName }
    });
    const response = createResponse();
    await contollers.getUserByName(request, response);
    const data = response._getJSONData() as User[];

    expect(response.statusCode).toBe(200);
    expect(data.length).toEqual(user.length);
  });
});
