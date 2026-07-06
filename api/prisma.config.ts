import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const db_URL =
  env("NODE_ENV") === "production"
    ? env("DIRECT_URL")
    : env("LOCAL_DATABASE_URL");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: db_URL,
  },
});
