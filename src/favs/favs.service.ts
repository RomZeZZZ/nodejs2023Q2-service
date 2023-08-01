import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FavsService {
  @Inject(DatabaseService)
  private readonly favsDb: DatabaseService;
  getFavs() {
    return this.favsDb.getAllFavsDb(); // Return all favs
  }
  addTrack(id: string) {
    if (!this.favsDb.validateId(id)) {
      throw new BadRequestException('Invalid track ID'); // 400
    }
    const trackIsExist = this.favsDb.getTrackById(id);
    if (!trackIsExist) {
      throw new UnprocessableEntityException('Track not found'); // 422
    }
    const trackId = this.favsDb.getFavTrackById(id);
    if (!trackId) {
      this.favsDb.addFavTrackById(id);
    }
  }
  deleteTrackFromFav(id: string) {
    if (!this.favsDb.validateId(id)) {
      throw new BadRequestException('Invalid track ID'); // 400
    }
    const trackIsExist = this.favsDb.getFavTrackById(id);
    if (!trackIsExist) {
      throw new NotFoundException('Track not found'); // 404
    }
    this.favsDb.deleteTrackFromFav(id);
  }
  addAlbum(id: string) {
    if (!this.favsDb.validateId(id)) {
      throw new BadRequestException('Invalid album ID'); // 400
    }
    const albumIsExist = this.favsDb.getAlbumById(id);
    if (!albumIsExist) {
      throw new UnprocessableEntityException('Album not found'); // 422
    }
    const albumId = this.favsDb.getFavAlbumById(id);
    if (!albumId) {
      this.favsDb.addFavAlbumById(id);
    }
  }
  deleteAlbumFromFav(id: string) {
    if (!this.favsDb.validateId(id)) {
      throw new BadRequestException('Invalid album ID'); // 400
    }
    const albumIsExist = this.favsDb.getFavAlbumById(id);
    if (!albumIsExist) {
      throw new NotFoundException('Album not found'); // 404
    }
    this.favsDb.deleteAlbumFromFav(id);
  }
  addArtist(id: string) {
    if (!this.favsDb.validateId(id)) {
      throw new BadRequestException('Invalid artist ID'); // 400
    }
    const artistIsExist = this.favsDb.getArtistById(id);
    if (!artistIsExist) {
      throw new UnprocessableEntityException('Artist not found'); // 422
    }
    const artistId = this.favsDb.getFavArtistById(id);
    if (!artistId) {
      this.favsDb.addFavArtistById(id);
    }
  }
  deleteArtistFromFav(id: string) {
    if (!this.favsDb.validateId(id)) {
      throw new BadRequestException('Invalid artist ID'); // 400
    }
    const artistIsExist = this.favsDb.getFavArtistById(id);
    if (!artistIsExist) {
      throw new NotFoundException('Artist not found'); // 404
    }
    this.favsDb.deleteArtistFromFav(id);
  }
}
