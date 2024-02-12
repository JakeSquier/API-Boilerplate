/** Node packages */
import { bench } from "vitest";
import request from "supertest";
/** Local imports */
import app from "../../app";
import { testUserName } from "../../models/user";

bench("Benchmarking GET /users/ endpoint", async () => {
  await request(app())
    .get("/users")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);
});

bench("Benchmarking GET /users/random endpoint", async () => {
  await request(app())
    .get("/users/random")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);
});

bench("Benchmarking GET /users/getByName/:name endpoint", async () => {
  await request(app())
    .get(`/users/getByName/${testUserName}`)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);
});
