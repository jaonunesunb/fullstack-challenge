import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1681501337126 implements MigrationInterface {
    name = 'initial1681501337126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(120) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_eff09bb429f175523787f46003b" UNIQUE ("email"), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client_contact" ("client_id" integer NOT NULL, "contact_id" integer NOT NULL, CONSTRAINT "PK_822555e8133d533b81712b795dd" PRIMARY KEY ("client_id", "contact_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4dbb209037c215934e475b2c9d" ON "client_contact" ("client_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a83c6407f07f307eba41f23a0" ON "client_contact" ("contact_id") `);
        await queryRunner.query(`ALTER TABLE "client_contact" ADD CONSTRAINT "FK_4dbb209037c215934e475b2c9da" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "client_contact" ADD CONSTRAINT "FK_3a83c6407f07f307eba41f23a07" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client_contact" DROP CONSTRAINT "FK_3a83c6407f07f307eba41f23a07"`);
        await queryRunner.query(`ALTER TABLE "client_contact" DROP CONSTRAINT "FK_4dbb209037c215934e475b2c9da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a83c6407f07f307eba41f23a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4dbb209037c215934e475b2c9d"`);
        await queryRunner.query(`DROP TABLE "client_contact"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
