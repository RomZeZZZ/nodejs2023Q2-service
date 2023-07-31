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

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TrackModule,
    ArtistsModule,
    AlbumModule,
    FavsModule,
  ],
  controllers: [AppController, FavsController],
  providers: [AppService, FavsService],
})
export class AppModule {}
