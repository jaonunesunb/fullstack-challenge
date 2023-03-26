import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1679684238952 implements MigrationInterface {
    name = 'Migration1679684238952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_e99f8e5bcbccaec7b0b7ed65526"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "registrationDate"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "clientContactsId" integer`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_328dcbcf0dcffee673e067035d9" FOREIGN KEY ("clientContactsId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_328dcbcf0dcffee673e067035d9"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "clientContactsId"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "registrationDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_e99f8e5bcbccaec7b0b7ed65526" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
