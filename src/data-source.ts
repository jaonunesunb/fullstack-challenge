import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Contact } from "../src/entities/Contact";
import "dotenv/config";
import { InitialMigration1682184290832 } from "./migrations/1682184290832-InitialMigration";

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
        entities: [User, Contact],
        migrations: [InitialMigration1682184290832],
      }
);

export default AppDataSource;
