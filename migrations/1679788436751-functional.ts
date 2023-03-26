import { MigrationInterface, QueryRunner } from "typeorm";

export class functional1679788436751 implements MigrationInterface {
    name = 'functional1679788436751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "FK_328dcbcf0dcffee673e067035d9"`);
        await queryRunner.query(`CREATE TABLE "client_contact" ("client_id" integer NOT NULL, "contact_id" integer NOT NULL, CONSTRAINT "PK_822555e8133d533b81712b795dd" PRIMARY KEY ("client_id", "contact_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4dbb209037c215934e475b2c9d" ON "client_contact" ("client_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a83c6407f07f307eba41f23a0" ON "client_contact" ("contact_id") `);
        await queryRunner.query(`ALTER TABLE "contact" DROP COLUMN "clientContactsId"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "client_contact" ADD CONSTRAINT "FK_4dbb209037c215934e475b2c9da" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_contact" ADD CONSTRAINT "FK_3a83c6407f07f307eba41f23a07" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_contact" DROP CONSTRAINT "FK_3a83c6407f07f307eba41f23a07"`);
        await queryRunner.query(`ALTER TABLE "client_contact" DROP CONSTRAINT "FK_4dbb209037c215934e475b2c9da"`);
        await queryRunner.query(`ALTER TABLE "contact" DROP CONSTRAINT "UQ_eff09bb429f175523787f46003b"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD "clientContactsId" integer`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a83c6407f07f307eba41f23a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4dbb209037c215934e475b2c9d"`);
        await queryRunner.query(`DROP TABLE "client_contact"`);
        await queryRunner.query(`ALTER TABLE "contact" ADD CONSTRAINT "FK_328dcbcf0dcffee673e067035d9" FOREIGN KEY ("clientContactsId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
