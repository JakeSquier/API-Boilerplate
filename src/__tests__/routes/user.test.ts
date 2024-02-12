/** Node packages */
import { describe, test, expect, expectTypeOf, beforeAll } from "vitest";
import request from "supertest";
import app from "../../app";
/** Local imports */
import getUserData, { testUserName, User } from "../../models/user";

describe("Testing user routes", () => {
  beforeAll(async () => {
    /** Hydrate user cache before testing */
    await getUserData();
  });

  test("GET /users/", async () => {
    return request(app())
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
    return request(app())
      .get("/users/random")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        const data = response.body as User;
        expectTypeOf(data).toEqualTypeOf<User>();
      });
  });

  test("GET /users/getByName/:name", async () => {
    return request(app())
      .get(`/users/getByName/${testUserName}`)
      .set("Accept", "application/json")
      .then((response) => {
        const data = response.body as User[];
        expect(data.length).toBeGreaterThan(0);
      });
  });
});
