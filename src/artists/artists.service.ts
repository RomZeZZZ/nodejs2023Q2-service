import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistReq, UpdateArtistDto } from './dto/artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from '../entity/Artist';
import { Repository } from 'typeorm';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistsRepository: Repository<ArtistEntity>,
  ) {}
  async createArtist(newArtistRequestData: ArtistReq) {
    const artist = new ArtistEntity();
    artist.id = this.generateUuid();
    artist.name = newArtistRequestData.name;
    artist.grammy = newArtistRequestData.grammy;
    await this.artistsRepository.manager.save(artist);
    return instanceToPlain(artist);
  }
  async getArtists() {
    return await this.artistsRepository.find();
  }
  async getArtist(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid Artist ID'); 
    }
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return instanceToPlain(artist);
  }
  async updateArtist(newInfo: UpdateArtistDto, id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid Artist ID');
    }
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    artist.name = newInfo.name;
    artist.grammy = newInfo.grammy;
    await this.artistsRepository.save(artist);
    return instanceToPlain(artist);
  }
  async deleteArtist(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid Artist ID');
    }
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    await this.artistsRepository.delete(id);
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
