import 'dotenv/config';
import { Request, Response, Router } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'default_secret';
const jwtExpiration = process.env.JWT_EXPIRATION || '1h'; // Corrigindo a tipagem

const authRouter = Router();

// Rota para autenticação
authRouter.post('/', async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
        res.status(401).json({ message: 'Senha incorreta' });
        return;
    }

    // Gerar o token JWT
    const token = jwt.sign(
        { id: user.id, roles: JSON.stringify(user.roles) },
        jwtSecret,
        { expiresIn: Number(jwtExpiration) || '1h' }
    );

    res.json({ token });
    return;
});

export default authRouter;
