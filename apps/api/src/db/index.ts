// import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import env from "@/api/env";

import * as schema from "./schema";

const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  schema,
  casing: "snake_case",
});

export default db;
