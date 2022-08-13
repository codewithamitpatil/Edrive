import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1653842115374 implements MigrationInterface {

    public async up( queryRunner: QueryRunner ): Promise<void> {
        await queryRunner.query( "ALTER TABLE `user` ADD `myname` TEXT NULL DEFAULT NULL AFTER `updatedAt`" );

    }

    public async down( queryRunner: QueryRunner ): Promise<void> {
    }

}
