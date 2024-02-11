import moize from "moize";
import z from "zod";

/**
 * A model file is responsible for data interactions may it be an in memory cache
 * or an external DB. This abstractness enables code cleanliness and scalability
 */

/**
 * Schema for a singular entry
 */
export const zUserSchema = z.object({
  gender: z.string(),
  name: z.object({
    title: z.string(),
    first: z.string(),
    last: z.string()
  }),
  location: z.object({
    street: z.object({
      number: z.number(),
      name: z.string()
    }),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postcode: z.union([z.string(), z.number()]),
    coordinates: z.object({
      latitude: z.string(),
      longitude: z.string()
    }),
    timezone: z.object({
      offset: z.string(),
      description: z.string()
    })
  }),
  email: z.string(),
  login: z.object({
    uuid: z.string(),
    username: z.string(),
    password: z.string(),
    salt: z.string(),
    md5: z.string(),
    sha1: z.string(),
    sha256: z.string()
  }),
  dob: z.object({
    date: z.string(),
    age: z.number()
  }),
  registered: z.object({
    date: z.string(),
    age: z.number()
  }),
  phone: z.string(),
  cell: z.string(),
  id: z.object({
    name: z.string(),
    value: z.union([z.string(), z.null()])
  }),
  picture: z.object({
    large: z.string(),
    medium: z.string(),
    thumbnail: z.string()
  }),
  nat: z.string()
});

export type User = z.infer<typeof zUserSchema>;

/**
 * user API response schema
 */
type UsersAPIResponse = {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: 1;
    version: string;
  };
};

/**
 * Utilizing a moize cache with an infinite max age
 * so we won't have to make recurring API calls
 */
export default moize.infinite(async (): Promise<User[] | undefined> => {
  try {
    const users = await fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data: UsersAPIResponse) => data.results);

    users.forEach((user) => {
      const userSchemaValidation = zUserSchema.safeParse(user);
      if (!userSchemaValidation.success) {
        const errors = userSchemaValidation.error.format();
        console.warn(
          "Ingested user did not pass schema validation " +
            JSON.stringify(errors)
        );
      }
    });

    return users;
  } catch (ex) {
    console.error(ex);
  }
});
