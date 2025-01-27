import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const authRouter = Router()

// Rota para autenticação
authRouter.post("/", async (req: Request, res: Response) => {
    const { email, senha } = req.body;
  
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });
  
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
  
    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta" });
    }
  
    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, "secreta", { expiresIn: "1h" });
  
    return res.json({ token });
  });

  export default authRouter