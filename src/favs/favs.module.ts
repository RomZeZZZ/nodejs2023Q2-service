import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavAlbumsEntity } from '../entity/favEntity/FavAlbumsEntity';
import { FavArtistsEntity } from '../entity/favEntity/FavArtistsEntity';
import { FavTracksEntity } from '../entity/favEntity/FavTracksEntity';
import { TrackEntity } from '../entity/Track';
import { ArtistEntity } from '../entity/Artist';
import { AlbumEntity } from '../entity/Albums';
@Module({
    imports: [
        TypeOrmModule.forFeature([FavAlbumsEntity]),
        TypeOrmModule.forFeature([FavArtistsEntity]),
        TypeOrmModule.forFeature([FavTracksEntity]),
        TypeOrmModule.forFeature([TrackEntity]),
        TypeOrmModule.forFeature([ArtistEntity]),
        TypeOrmModule.forFeature([AlbumEntity])
    ],
    controllers: [FavsController],
    providers: [FavsService],
})
export class FavsModule {}
