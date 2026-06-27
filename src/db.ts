import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "note_app",
  password: "12345678910abcA",
  port: 5432,
});