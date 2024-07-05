import { MigrationInterface, QueryRunner } from "typeorm";

export class Schema1720140023243 implements MigrationInterface {
    name = 'Schema1720140023243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "member" ("code" character varying NOT NULL, "name" character varying NOT NULL, "isPenalized" boolean NOT NULL DEFAULT false, "penaltyEndDate" TIMESTAMP, CONSTRAINT "PK_87dbb39d7c7c430faa5bf1af3bb" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "book" ("code" character varying NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_153910bab5ef6438fb822a0c143" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "borrowing" ("id" SERIAL NOT NULL, "bookCode" character varying NOT NULL, "memberCode" character varying NOT NULL, "borrowDate" TIMESTAMP NOT NULL, "returnDate" TIMESTAMP, CONSTRAINT "PK_5bfeaa4e275c1a2e2ab257f2ee2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "borrowing" ADD CONSTRAINT "FK_1ad61b07c8d8dfa0a131fc59b4f" FOREIGN KEY ("bookCode") REFERENCES "book"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "borrowing" ADD CONSTRAINT "FK_4654d02a6386261864c760b51e8" FOREIGN KEY ("memberCode") REFERENCES "member"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "borrowing" DROP CONSTRAINT "FK_4654d02a6386261864c760b51e8"`);
        await queryRunner.query(`ALTER TABLE "borrowing" DROP CONSTRAINT "FK_1ad61b07c8d8dfa0a131fc59b4f"`);
        await queryRunner.query(`DROP TABLE "borrowing"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "member"`);
    }

}
