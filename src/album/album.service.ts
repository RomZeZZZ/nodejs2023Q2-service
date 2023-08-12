import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumReq, UpdateAlbumDto } from './dto/album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../entity/Albums';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}
  async createAlbum(newAlbumRequestData: AlbumReq) {
    const album = new AlbumEntity();
    album.id = this.generateUuid();
    album.name = newAlbumRequestData.name;
    album.year = newAlbumRequestData.year;
    album.artistId = newAlbumRequestData.artistId;
    await this.albumRepository.manager.save(album);
    return instanceToPlain(album);
  }
  async getAlbums() {
    return await this.albumRepository.find();
  }
  async getAlbum(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('album not found');
    }
    return instanceToPlain(album);
  }
  async updateAlbum(newInfo: UpdateAlbumDto, id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    album.name = newInfo.name;
    album.year = newInfo.year;
    album.artistId = newInfo.artistId;
    await this.albumRepository.save(album);
    return instanceToPlain(album);
  }
  async deleteAlbum(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid album ID');
    }
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    await this.albumRepository.delete(id);
  }
  generateUuid(): string {
    const uuid = uuidv4(); 
    return uuid;
  }
  validateId(id: string): boolean {
    return validateUuid(id);
  }
  generateCurrentTime(): number {
    const now = new Date().getTime(); 
    return now;
  }
}
