import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRouter = Router();

// Rota para criar um usuário
userRouter.post("/", async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  // Obter o repositório do usuário
  const userRepository = AppDataSource.getRepository(User);

  // Verificar se o email já existe
  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email já cadastrado" });
  }

  // Criar um novo usuário
  const user = userRepository.create({ nome, email, senha });
  await userRepository.save(user);

  // Remover a senha do retorno por segurança
  const { senha: _, ...userWithoutPassword } = user;

  return res.status(201).json(userWithoutPassword);
});


export default userRouter;
