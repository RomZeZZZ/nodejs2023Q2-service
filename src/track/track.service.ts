import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackReq, UpdateTrackDto } from './dto/track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from '../entity/Track.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private tracksRepository: Repository<TrackEntity>,
  ) {}
  async createTrack(newTrackRequestData: TrackReq) {
    const track = new TrackEntity();
    track.id = this.generateUuid();
    track.name = newTrackRequestData.name;
    track.artistId = newTrackRequestData.artistId || null;
    track.albumId = newTrackRequestData.albumId || null;
    track.duration = newTrackRequestData.duration;
    await this.tracksRepository.manager.save(track);
    return instanceToPlain(track);
  }
  async getTracks() {
    return await this.tracksRepository.find();
  }
  async getTrack(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return instanceToPlain(track);
  }
  async updateTrack(newInfo: UpdateTrackDto, id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    track.name = newInfo.name;
    track.duration = newInfo.duration;
    await this.tracksRepository.save(track);
    return instanceToPlain(track);
  }
  async deletetrack(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('User not found');
    }
    await this.tracksRepository.delete(id);
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
