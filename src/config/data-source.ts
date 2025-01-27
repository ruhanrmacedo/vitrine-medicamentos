import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Medicamento } from "../entities/Medicamento";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "18031993",
  database: "vitrine_medicamentos",
  synchronize: false,
  logging: true,
  entities: [User, Medicamento],
  migrations: ["src/migrations/*.ts"],
});
