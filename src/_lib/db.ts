import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const dbConfig = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    ssl: true,
};

export const db = new Pool(dbConfig);
