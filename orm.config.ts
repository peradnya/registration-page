import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { User } from "./src/entity/user";

const OrmConfig: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: ["src/subscriber/*.js"],
  migrations: ["src/migration/*.js"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export default OrmConfig;
