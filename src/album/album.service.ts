import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AlbumReq, UpdateAlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  @Inject(DatabaseService)
  private readonly albumDb: DatabaseService;
  getAlbums() {
    return this.albumDb.getAlbumsDb(); // Return all tracks
  }
  getAlbum(id: string) {
    if (!this.albumDb.validateId(id)) {
      throw new BadRequestException('Invalid album ID'); // 400
    }
    const album = this.albumDb.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('album not found'); // 404
    }
    return album;
  }
  createAlbum(newAlbumRequestData: AlbumReq) {
    const album = this.albumDb.addAlbum(newAlbumRequestData);
    return album;
  }
  updateAlbum(newInfo: UpdateAlbumDto, id: string) {
    if (!this.albumDb.validateId(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    const album = this.albumDb.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    const returnAlbum = this.albumDb.updateAlbum(id, newInfo);
    return returnAlbum;
  }
  deleteAlbum(id: string) {
    if (!this.albumDb.validateId(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    const album = this.albumDb.getAlbumById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    this.albumDb.deleteAlbumById(id);
  }
}
