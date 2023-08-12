import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './track/track.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumModule } from './album/album.module';
import { FavsController } from './favs/favs.controller';
import { FavsService } from './favs/favs.service';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from "./entity/User"
import { TrackEntity } from './entity/Track';
import { ArtistEntity } from './entity/Artist';
import { AlbumEntity } from './entity/Albums';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TrackModule,
    ArtistsModule,
    AlbumModule,
    FavsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4040,
      username: 'test',
      password: 'test',
      database: 'test_db',
      synchronize: true,
      logging: false,
      entities: [UserEntity, TrackEntity, ArtistEntity, AlbumEntity],
    }),
  ],
  controllers: [AppController, FavsController],
  providers: [AppService, FavsService],
})
export class AppModule {}
