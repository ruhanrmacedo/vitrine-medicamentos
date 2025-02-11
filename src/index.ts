import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import cors from "cors"
import "dotenv/config";

const app = express();

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import medicamentosRouter from "./routes/medicamentos.routes";
import rbacRouter from "./routes/rbac.routes";
import { Request, Response } from "express";

app.use(cors())
app.use(express.json())

app.use("/users", userRouter)
app.use("/login", authRouter)
app.use("/medicamentos", medicamentosRouter)
app.use("/rbac", rbacRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida!");
  })
  .catch((error) => console.log(error));

app.get("/", (req: Request, res: Response) => {
  res.send("API funcionando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});
