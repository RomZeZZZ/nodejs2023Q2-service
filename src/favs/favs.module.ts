import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavAlbumsEntity } from '../entity/favEntity/FavAlbumsEntity.entity';
import { FavArtistsEntity } from '../entity/favEntity/FavArtistsEntity.entity';
import { FavTracksEntity } from '../entity/favEntity/FavTracksEntity.entity';
import { TrackEntity } from '../entity/Track.entity';
import { ArtistEntity } from '../entity/Artist.entity';
import { AlbumEntity } from '../entity/Albums.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([FavAlbumsEntity]),
    TypeOrmModule.forFeature([FavArtistsEntity]),
    TypeOrmModule.forFeature([FavTracksEntity]),
    TypeOrmModule.forFeature([TrackEntity]),
    TypeOrmModule.forFeature([ArtistEntity]),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
