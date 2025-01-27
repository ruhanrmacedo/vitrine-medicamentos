import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import cors from "cors"

const app = express();

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import { Request, Response } from "express";

app.use(cors())
app.use(express.json())

app.use("/users", userRouter)
app.use("/login", authRouter)

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida!");
  })
  .catch((error) => console.log(error));

app.get("/", (req: Request, res: Response) => {
  res.send("API funcionando!");
  req.body
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});
