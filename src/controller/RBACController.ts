import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Permission } from '../entities/Permission';
import { Role } from '../entities/Role';
import { User } from '../entities/User';

const permissionRepository = AppDataSource.getRepository(Permission);
const roleRepository = AppDataSource.getRepository(Role);
const userRepository = AppDataSource.getRepository(User);

export class RBACController {
    // Listar todas as permissões
    async listPermissions(req: Request, res: Response) {
        try {
            const permissions = await permissionRepository.find();
            res.json(permissions);
            return;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Erro ao listar permissões',
                    error: error.message,
                });
                return;
            }
            res.status(500).json({
                message: 'Erro desconhecido ao listar permissões',
            });
            return;
        }
    }

    // Criar uma nova permissão
    async createOnePermission(req: Request, res: Response) {
        try {
            const { description } = req.body;
            if (!description)
                return res
                    .status(400)
                    .json({ message: 'Descrição é obrigatória' });

            const permission = permissionRepository.create({ description });
            await permissionRepository.save(permission);
            res.status(201).json(permission);
            return;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Erro ao criar permissão',
                    error: error.message,
                });
                return;
            }
            res.status(500).json({
                message: 'Erro desconhecido ao criar permissão',
            });
            return;
        }
    }

    // Listar todos os papéis (roles)
    async listRoles(req: Request, res: Response) {
        try {
            const roles = await roleRepository.find({
                relations: ['permissions'],
            });
            res.json(roles);
            return;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Erro ao listar roles',
                    error: error.message,
                });
                return;
            }
            res.status(500).json({
                message: 'Erro desconhecido ao listar roles',
            });
            return;
        }
    }

    // Criar um novo papel (role)
    async createOneRole(req: Request, res: Response) {
        try {
            const { description } = req.body;
            if (!description)
                return res
                    .status(400)
                    .json({ message: 'Descrição é obrigatória' });

            const role = roleRepository.create({ description });
            await roleRepository.save(role);
            res.status(201).json(role);
            return;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Erro ao criar role',
                    error: error.message,
                });
                return;
            }
            res.status(500).json({
                message: 'Erro desconhecido ao criar role',
            });
            return;
        }
    }

    // Listar permissões de um papel específico
    async listPermissionsByRole(req: Request, res: Response) {
        try {
            const { roleId } = req.params;
            const role = await roleRepository.findOne({
                where: { id: Number(roleId) },
                relations: ['permissions'],
            });

            if (!role)
                return res.status(404).json({ message: 'Role não encontrada' });
            res.json(role.permissions);
            return;
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Erro ao listar permissões do role',
                    error: error.message,
                });
                return;
            }
            res.status(500).json({
                message: 'Erro desconhecido ao listar permissões do role',
            });
            return;
        }
    }

    // Adicionar uma permissão a um papel (role)
    async addPermissionToRole(req: Request, res: Response) {
        try {
            const { roleId, permissionId } = req.body;

            const role = await roleRepository.findOne({
                where: { id: Number(roleId) },
                relations: ['permissions'],
            });

            const permission = await permissionRepository.findOneBy({
                id: Number(permissionId),
            });

            if (!role || !permission)
                return res
                    .status(404)
                    .json({ message: 'Role ou Permissão não encontrada' });

            role.permissions.push(permission);
            await roleRepository.save(role);

            return res.status(200).json(role);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Erro ao adicionar permissão ao role',
                    error: error.message,
                });
                return;
            }
            res.status(500).json({
                message: 'Erro desconhecido ao adicionar permissão ao role',
            });
            return;
        }
    }

    // Adicionar um papel (role) a um usuário
    async addRoleToUser(req: Request, res: Response) {
        try {
            const { userId, roleId } = req.body;

            const user = await userRepository.findOne({
                where: { id: Number(userId) },
                relations: ['roles'],
            });

            const role = await roleRepository.findOneBy({ id: Number(roleId) });

            if (!user || !role)
                return res
                    .status(404)
                    .json({ message: 'Usuário ou Role não encontrada' });

            user.roles.push(role);
            await userRepository.save(user);

            return res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    message: 'Erro ao adicionar role ao usuário',
                    error: error.message,
                });
                return;
            }
            res.status(500).json({
                message: 'Erro desconhecido ao adicionar role ao usuário',
            });
            return;
        }
    }
}
