import { describe, test, expect } from "vitest";
import getUserData from "../../models/user";
import { zUserSchema } from "../../models/user";

describe("User model tests", () => {
  test("Testing the amount of users cached", async () => {
    const allUserData = await getUserData();

    expect(allUserData).toBeDefined();
  });

  test("Testing schema of cached user data", async () => {
    const allUserData = await getUserData();
    if (!allUserData) {
      throw new Error("Test was unable to retrieve user data");
    }

    for (const user of allUserData) {
      const userSchemaValidation = zUserSchema.safeParse(user);
      expect(userSchemaValidation.success).toBe(true);
    }
  });
});
