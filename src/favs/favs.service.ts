import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavAlbumsEntity } from '../entity/favEntity/FavAlbumsEntity';
import { FavArtistsEntity } from '../entity/favEntity/FavArtistsEntity';
import { FavTracksEntity } from '../entity/favEntity/FavTracksEntity';
import { Repository } from 'typeorm';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { TrackEntity } from '../entity/Track';
import { AlbumEntity } from '../entity/Albums';
import { ArtistEntity } from '../entity/Artist';


@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavAlbumsEntity)
    private favsAlbumsRepository: Repository<FavAlbumsEntity>,
    @InjectRepository(FavArtistsEntity)
    private favsArtistsRepository: Repository<FavArtistsEntity>,
    @InjectRepository(FavTracksEntity)
    private favsTrucksRepository: Repository<FavTracksEntity>,
    @InjectRepository(TrackEntity)
    private trucksRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumsRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}
  async getFavs() {
    const albums = await this.favsAlbumsRepository.find({
      relations: { album: true }
    });
    const tracks = await this.favsTrucksRepository.find({
      relations: { track: true }
    });
    const artist = await this.favsArtistsRepository.find({
      relations: { artist: true }
    });
    const returnAlbum = albums.map(album => album.album);
    const returnTrack = tracks.map(tracks => tracks.track);
    const returnArtist = artist.map(artist => artist.artist);
    return {
      artists: returnArtist,
      albums: returnAlbum,
      tracks: returnTrack
    }
  }
  async addTrack(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid track ID'); // 400
    }
    const isTrackExist = await this.trucksRepository.findOneBy({ id });
    if (!isTrackExist) {
      throw new UnprocessableEntityException('Track not found'); // 422
    }
    const trackId = await this.favsTrucksRepository.findOneBy({ trackId: id });
    if (!trackId) {
        const favTrack = this.favsTrucksRepository.create({trackId: id});
        await this.favsTrucksRepository.manager.save(favTrack);
    }
  }
  async deleteTrackFromFav(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid track ID'); 
    }
    const trackId = await this.favsTrucksRepository.findOneBy({ trackId: id });
    if (!trackId) {
      throw new NotFoundException('Track not found'); 
    }
    return await this.favsTrucksRepository.delete({ trackId: id });
  }
  async addAlbum(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid album ID'); 
    }
    const isAlbumExist = await this.albumsRepository.findOneBy({ id });
    if (!isAlbumExist) {
      throw new UnprocessableEntityException('Album not found'); 
    }
    const albumId = await this.favsAlbumsRepository.findOneBy({ albumId: id });
    if (!albumId) {
      const favAlbum = this.favsAlbumsRepository.create({albumId: id});
      return await this.favsAlbumsRepository.manager.save(favAlbum);
    }
  }
  async deleteAlbumFromFav(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid album ID'); 
    }
    const albumIsExist = await this.favsAlbumsRepository.findOneBy({ albumId: id });
    if (!albumIsExist) {
      throw new NotFoundException('Album not found'); 
    }
    await this.favsAlbumsRepository.delete({ albumId: id });
  }
  async addArtist(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid artist ID'); 
    }
    const artistIsExist =  await this.artistsRepository.findOneBy({ id });
    if (!artistIsExist) {
      throw new UnprocessableEntityException('Artist not found'); 
    }
    const artistId = await this.favsArtistsRepository.findOneBy({ artistId: id });
    if (!artistId) {
      const favArtist = this.favsArtistsRepository.create({artistId: id});
      return await this.favsArtistsRepository.manager.save(favArtist);
    }
  }
  async deleteArtistFromFav(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid artist ID'); 
    }
    const artistIsExist = await this.favsArtistsRepository.findOneBy({ artistId: id });
    if (!artistIsExist) {
      throw new NotFoundException('Artist not found');
    }
    await this.favsArtistsRepository.delete({ artistId: id });
  }
  generateUuid(): string {
    const uuid = uuidv4(); // Generate UUIDv4
    return uuid;
  }
  validateId(id: string): boolean {
    return validateUuid(id);
  }
  generateCurrentTime(): number {
    const now = new Date().getTime(); // Generate current time
    return now;
  }
}
