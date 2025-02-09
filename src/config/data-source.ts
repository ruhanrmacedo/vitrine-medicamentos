import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Medicamento } from "../entities/Medicamento";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities: [User, Medicamento],
  migrations: ["src/migrations/*.ts"],
});
