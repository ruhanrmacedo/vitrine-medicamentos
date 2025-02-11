import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRBCA1739067575938 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criar a tabela de roles (funções)
        await queryRunner.createTable(new Table({
            name: "roles",
            columns: [
                { name: "id", type: "serial", isPrimary: true },
                { name: "description", type: "varchar", isUnique: true },
                { name: "createdAt", type: "timestamp", default: "now()" },
                { name: "updatedAt", type: "timestamp", isNullable: true }
            ]
        }), true);

        // Criar a tabela de permissions (permissões)
        await queryRunner.createTable(new Table({
            name: "permissions",
            columns: [
                { name: "id", type: "serial", isPrimary: true },
                { name: "description", type: "varchar", isUnique: true },
                { name: "createdAt", type: "timestamp", default: "now()" },
                { name: "updatedAt", type: "timestamp", isNullable: true }
            ]
        }), true);

        // Criar a tabela intermediária user_roles
        await queryRunner.createTable(new Table({
            name: "user_roles",
            columns: [
                { name: "userId", type: "integer", isPrimary: true },
                { name: "roleId", type: "integer", isPrimary: true }
            ]
        }), true);

        // Criar a tabela intermediária permission_role
        await queryRunner.createTable(new Table({
            name: "permission_role",
            columns: [
                { name: "roleId", type: "integer", isPrimary: true },
                { name: "permissionId", type: "integer", isPrimary: true }
            ]
        }), true);

        // Criar chaves estrangeiras para user_roles
        await queryRunner.createForeignKey("user_roles", new TableForeignKey({
            columnNames: ["userId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("user_roles", new TableForeignKey({
            columnNames: ["roleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "CASCADE"
        }));

        // Criar chaves estrangeiras para permission_role
        await queryRunner.createForeignKey("permission_role", new TableForeignKey({
            columnNames: ["roleId"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("permission_role", new TableForeignKey({
            columnNames: ["permissionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "permissions",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("permission_role");
        await queryRunner.dropTable("user_roles");
        await queryRunner.dropTable("permissions");
        await queryRunner.dropTable("roles");
    }

}
