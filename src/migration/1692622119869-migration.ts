import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692622119869 implements MigrationInterface {
    name = 'Migration1692622119869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artist_entity" ("id" uuid NOT NULL, "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_c6ec16b57b60c8096406808021d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album_entity" ("id" uuid NOT NULL, "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_319a74c2085b42849b15412a3bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track_entity" ("id" uuid NOT NULL, "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_9cc0e8a743e689434dac0130098" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_albums_entity" ("id" SERIAL NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "REL_684fee9333bc00b0b712c17d34" UNIQUE ("albumId"), CONSTRAINT "PK_489c348767e83dfa48932947563" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_artists_entity" ("id" SERIAL NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "REL_d4c1a63c4ab19ba38d63cc0b8c" UNIQUE ("artistId"), CONSTRAINT "PK_2ec7fafdc7c475b53734df004d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_tracks_entity" ("id" SERIAL NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "REL_7686e091777cc45248b5d986a3" UNIQUE ("trackId"), CONSTRAINT "PK_ba5fdd425f8e866143c02a34bfb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "album_entity" ADD CONSTRAINT "FK_4aea5943406bd89eced202b012b" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track_entity" ADD CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track_entity" ADD CONSTRAINT "FK_f75df6098780938c05b7a65d2ca" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_albums_entity" ADD CONSTRAINT "FK_684fee9333bc00b0b712c17d34b" FOREIGN KEY ("albumId") REFERENCES "album_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_artists_entity" ADD CONSTRAINT "FK_d4c1a63c4ab19ba38d63cc0b8c8" FOREIGN KEY ("artistId") REFERENCES "artist_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_tracks_entity" ADD CONSTRAINT "FK_7686e091777cc45248b5d986a39" FOREIGN KEY ("trackId") REFERENCES "track_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fav_tracks_entity" DROP CONSTRAINT "FK_7686e091777cc45248b5d986a39"`);
        await queryRunner.query(`ALTER TABLE "fav_artists_entity" DROP CONSTRAINT "FK_d4c1a63c4ab19ba38d63cc0b8c8"`);
        await queryRunner.query(`ALTER TABLE "fav_albums_entity" DROP CONSTRAINT "FK_684fee9333bc00b0b712c17d34b"`);
        await queryRunner.query(`ALTER TABLE "track_entity" DROP CONSTRAINT "FK_f75df6098780938c05b7a65d2ca"`);
        await queryRunner.query(`ALTER TABLE "track_entity" DROP CONSTRAINT "FK_3cfbf55ef8a58b6447c226d2260"`);
        await queryRunner.query(`ALTER TABLE "album_entity" DROP CONSTRAINT "FK_4aea5943406bd89eced202b012b"`);
        await queryRunner.query(`DROP TABLE "fav_tracks_entity"`);
        await queryRunner.query(`DROP TABLE "fav_artists_entity"`);
        await queryRunner.query(`DROP TABLE "fav_albums_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "track_entity"`);
        await queryRunner.query(`DROP TABLE "album_entity"`);
        await queryRunner.query(`DROP TABLE "artist_entity"`);
    }

}
