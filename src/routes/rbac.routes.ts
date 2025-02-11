import { Router } from "express";
import { RBACController } from "../controller/RBACController";
import { authenticate } from "../middleware/auth"; // Importa o middleware de autenticação

const rbacRouter = Router();
const rbacController = new RBACController();

// Rotas para o RBAC com autenticação e autorização

// Apenas usuários autenticados podem listar permissões
rbacRouter.get("/permissions", authenticate(["listar_permissoes"]), (req, res) => 
    rbacController.listPermissions(req, res)
);

// Apenas usuários autenticados podem criar novas permissões
rbacRouter.post("/permissions", authenticate(["criar_permissao"]), (req, res) => 
    rbacController.createOnePermission(req, res)
);

// Apenas usuários autenticados podem listar roles
rbacRouter.get("/roles", authenticate(["listar_roles"]), (req, res) => 
    rbacController.listRoles(req, res)
);

// Apenas usuários com permissão para criar roles podem acessar
rbacRouter.post("/roles", authenticate(["criar_role"]), (req, res) => 
    rbacController.createOneRole(req, res)
);

// Apenas usuários autenticados podem listar permissões de um role específico
rbacRouter.get("/roles/:roleId/permissions", authenticate(["listar_permissoes_por_role"]), (req, res) => 
    rbacController.listPermissionsByRole(req, res)
);

// Apenas usuários com permissão podem adicionar permissões a um role
rbacRouter.post("/roles/permissions", authenticate(["adicionar_permissao_a_role"]), (req, res) => 
    rbacController.addPermissionToRole(req, res)
);

// Apenas usuários com permissão podem adicionar roles a usuários
rbacRouter.post("/users/roles", authenticate(["atribuir_role_a_usuario"]), (req, res) => 
    rbacController.addRoleToUser(req, res)
);

export default rbacRouter;
