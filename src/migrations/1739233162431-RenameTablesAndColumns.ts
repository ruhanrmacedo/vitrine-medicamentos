import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTablesAndColumns1739233162431 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Renomear tabela "user" para "users"
        await queryRunner.renameTable('user', 'users');

        // Renomear colunas da tabela "user_roles"
        await queryRunner.renameColumn('user_roles', 'userId', 'user_id');
        await queryRunner.renameColumn('user_roles', 'roleId', 'role_id');

        // Renomear colunas da tabela "permission_role"
        await queryRunner.renameColumn('permission_role', 'roleId', 'role_id');
        await queryRunner.renameColumn(
            'permission_role',
            'permissionId',
            'permission_id'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverter nomes para os originais
        await queryRunner.renameTable('users', 'user');

        await queryRunner.renameColumn('user_roles', 'user_id', 'userId');
        await queryRunner.renameColumn('user_roles', 'role_id', 'roleId');

        await queryRunner.renameColumn('permission_role', 'role_id', 'roleId');
        await queryRunner.renameColumn(
            'permission_role',
            'permission_id',
            'permissionId'
        );
    }
}
