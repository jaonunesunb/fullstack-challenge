import { DataSource } from "typeorm";
import { User } from "../src/entities/user";
import { InitialMigration1679679075688 } from "../src/migrations/1679679075688-InitialMigration";
import { Migration1679684238952 } from "../src/migrations/1679684238952-Migration";
import { final1679704270885 } from "../src/migrations/1679704270885-final";
import { fixed1679713737019 } from "../src/migrations/1679713737019-fixed";
import { functional1679788436751 } from "../src/migrations/1679788436751-functional";
import { Client } from "../src/entities/Client";
import { Contact } from "../src/entities/Contact";
import "dotenv/config";

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
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE,
        logging: true,
        synchronize: false,
        entities: [User, Client, Contact],
        migrations: [
          InitialMigration1679679075688,
          Migration1679684238952,
          final1679704270885,
          fixed1679713737019,
          functional1679788436751,
        ],
      }
);

export default AppDataSource;
