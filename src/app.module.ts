import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from "./entity/User"
import { TrackEntity } from './entity/Track';
import { ArtistEntity } from './entity/Artist';
import { AlbumEntity } from './entity/Albums';
import { FavAlbumsEntity } from './entity/favEntity/FavAlbumsEntity';
import { FavArtistsEntity } from './entity/favEntity/FavArtistsEntity';
import { FavTracksEntity } from './entity/favEntity/FavTracksEntity';

@Module({
  imports: [
    UserModule,
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
      entities: [UserEntity, TrackEntity, ArtistEntity, AlbumEntity, FavAlbumsEntity, FavArtistsEntity, FavTracksEntity],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
