import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRouter = Router();

// Cadastrar usuário
userRouter.post("/", async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  const userRepository = AppDataSource.getRepository(User);

  // Verificar se o email já existe
  const existingUser = await userRepository.findOneBy({ email });
  if (existingUser) {
    res.status(400).json({ message: "Email já cadastrado" });
    return;
  }

  // Criar um novo usuário
  const user = userRepository.create({ nome, email, senha });
  await userRepository.save(user);

  // Retornar o usuário sem a senha
  const { senha: _, ...userWithoutPassword } = user;

  res.status(201).json(userWithoutPassword);
  return;
});


export default userRouter;
