import { Router } from "express";
import { RBACController } from "../controller/RBACController";

const rbacRouter = Router();
const rbacController = new RBACController();

// Rotas para o RBAC
rbacRouter.get("/permissions", rbacController.listPermissions);
rbacRouter.post("/permissions", rbacController.createOnePermission);
rbacRouter.get("/roles", rbacController.listRoles);
rbacRouter.post("/roles", rbacController.createOneRole);
rbacRouter.get("/roles/:id/permissions", rbacController.listPermissionsByRole);
rbacRouter.post("/roles/:id/permissions", rbacController.addPermissionToRole);
rbacRouter.post("/users/roles",rbacController.addRoleToUser);

export default rbacRouter;
