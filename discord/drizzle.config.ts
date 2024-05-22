import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
    schema: "./db/schema.ts",
    out: "./drizzle", // "postgresql" | "mysql"
    driver: "pg", // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!
    },
} satisfies Config;

