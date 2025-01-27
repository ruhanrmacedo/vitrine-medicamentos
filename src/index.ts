import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida!");
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000!");
});
