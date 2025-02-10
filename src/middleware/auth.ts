import "dotenv/config";
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";

declare module 'express-serve-static-core' {
    interface Request {
        user?: { id: number, roles?: Role[] };
    }
}

const jwtSecret = process.env.JWT_SECRET || "default_secret";

// Autenticação de usuário com JWT
export const authenticate = (listaPermissoes: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                res.status(401).json({ message: "Token não fornecido!" });
                return;
            }

            // Decodifica o token
            const payload = jwt.verify(token, jwtSecret) as JwtPayload & { id: number, roles: string };

            const roles: Role[] = JSON.parse(payload.roles || "[]");

            let hasPermission = false;

            // Verifica se o usuário é admin ou tem permissões necessárias
            roles.forEach((role: Role) => {
                if (role.description === "admin") {
                    hasPermission = true;
                    return;
                }

                role.permissions.forEach((permission: Permission) => {
                    if (listaPermissoes.includes(permission.description)) {
                        hasPermission = true;
                        return;
                    }
                });
            });

            if (!hasPermission) {
                res.status(403).json({ message: "Usuário não tem permissão para acessar este recurso!" });
                return;
            }

            req.user = { id: payload.id, roles };

            next();
        } catch (error) {
            res.status(401).json({ message: "Token inválido!" });
            return;
        }
    };

};
