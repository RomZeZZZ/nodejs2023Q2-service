import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './track/track.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UserModule, DatabaseModule, TrackModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {};
