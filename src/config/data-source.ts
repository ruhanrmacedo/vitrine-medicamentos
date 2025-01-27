import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "18031993",
  database: "vitrine_medicamentos",
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: ["src/migrations/*.ts"],
});
