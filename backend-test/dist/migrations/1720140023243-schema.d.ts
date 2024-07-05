import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Schema1720140023243 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
