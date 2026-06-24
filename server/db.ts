import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../drizzle/schema";

const databaseUrl = process.env.DATABASE_URL;

// Allow the server to start without a DB configured (dev/preview mode).
// Routes that need the DB will fail gracefully with a 503 instead of crashing
// the whole process.
let db: ReturnType<typeof drizzle<typeof schema>>;

if (databaseUrl) {
  const sql = neon(databaseUrl);
  db = drizzle(sql, { schema });
} else {
  console.warn(
    "[db] DATABASE_URL is not set — database features will be unavailable. " +
      "Add DATABASE_URL to your .env to enable them."
  );
  // Create a proxy that throws a clear error when any db method is called
  db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
    get(_target, prop) {
      return () => {
        throw new Error(
          "DATABASE_URL is not configured. Please add it to your .env file."
        );
      };
    },
  });
}

export { db, schema };
