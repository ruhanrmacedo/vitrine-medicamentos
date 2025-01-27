import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMedicamento1737951607940 implements MigrationInterface {
    name = 'CreateMedicamento1737951607940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medicamento" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" character varying, "quantidade" integer NOT NULL, "userId" integer, CONSTRAINT "PK_d78d6a102cc6e898c965583d55a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medicamento" ADD CONSTRAINT "FK_b4968ce268a44b0efe5a8a55524" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicamento" DROP CONSTRAINT "FK_b4968ce268a44b0efe5a8a55524"`);
        await queryRunner.query(`DROP TABLE "medicamento"`);
    }

}
