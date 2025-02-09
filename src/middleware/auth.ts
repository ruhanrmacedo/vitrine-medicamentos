import "dotenv/config";
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
    interface Request {
        user?: { id: number };
    }
}

const jwtSecret = process.env.JWT_SECRET || "default_secret";

// Autenticação de usuário com JWT
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload & { id: number };
        req.user = { id: decoded.id }; 
        next();
    } catch (error) {
        res.status(401).json({ message: "Token inválido" });
        return;
    }
};
