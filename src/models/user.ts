import moize from "moize";
/**
 * A model file is responsible for data interactions may it be an in memory cache
 * or an external DB. This abstractness enables code cleanliness and scalability
 */

/**
 * Schema for a singular entry
 */
type User = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: string;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

/**
 * Public API response schema
 */
type PublicApiResponse = {
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
export default moize.infinite(async (): Promise<User[]> => {
  return await fetch("https://randomuser.me/api/?results=100")
    .then((res) => res.json())
    .then((data: PublicApiResponse) => data.results);
});
