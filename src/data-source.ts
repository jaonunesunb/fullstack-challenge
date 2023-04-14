import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Client } from "../src/entities/Client";
import { Contact } from "../src/entities/Contact";
import "dotenv/config";
import { initial1681501114257 } from "./migrations/1681501114257-initial";
import { initial1681501337126 } from "./migrations/1681501337126-initial";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/entities/**/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.PGHOST!,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER!,
        password: process.env.PGPASSWORD!,
        database: process.env.PGDATABASE!,
        logging: true,
        synchronize: false,
        entities: [User, Client, Contact],
        migrations: [initial1681501114257, initial1681501337126],
      }
);

export default AppDataSource;
