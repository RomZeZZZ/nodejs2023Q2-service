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
import { configDb } from './database/configDb';
@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistsModule,
    AlbumModule,
    FavsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configDb),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
