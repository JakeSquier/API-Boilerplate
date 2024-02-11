/** Node packages */
import { describe, test, expect, expectTypeOf } from "vitest";
import request from "supertest";
import app from "../../app";
/** Local imports */
import getUserData, { User } from "../../models/user";

describe("Testing user routes", () => {
  test("GET /users/", async () => {
    return request(app)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        const data = response.body as User[];
        expect(data.length).toBeGreaterThan(99);
      });
  });

  test("GET /users/random", async () => {
    return request(app)
      .get("/users/random")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        const data = response.body as User;
        expectTypeOf(data).toEqualTypeOf<User>();
      });
  });

  test("GET /users/:name", async () => {
    const testName = "jane";
    const users = await getUserData();
    if (!users) {
      throw new Error("Test was unable to retrieve user data");
    }

    const user = users.filter(
      (user) => user.name.first.toLowerCase() === testName
    );

    return request(app)
      .get(`/users/getByName/${testName}`)
      .set("Accept", "application/json")
      .then((response) => {
        const data = response.body as User[];
        if (!user) {
          expect(data.length).toBeLessThan(1);
        } else {
          expect(data).toEqual(user);
        }
      });
  });
});
