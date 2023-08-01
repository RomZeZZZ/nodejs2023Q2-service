import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackReq, UpdateTrackDto } from './dto/track.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TrackService {
  @Inject(DatabaseService)
  private readonly tracksDb: DatabaseService;
  getTracks() {
    return this.tracksDb.getTracksDb(); // Return all tracks
  }
  getTrack(id: string) {
    if (!this.tracksDb.validateId(id)) {
      throw new BadRequestException('Invalid track ID'); // 400
    }
    const track = this.tracksDb.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found'); // 404
    }
    return track;
  }
  createTrack(newTrackRequestData: TrackReq) {
    const track = this.tracksDb.addTrack(newTrackRequestData);
    return track;
  }
  updateTrack(newInfo: UpdateTrackDto, id: string) {
    if (!this.tracksDb.validateId(id)) {
      throw new BadRequestException('Invalid track ID');
    }
    const track = this.tracksDb.getTrackById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    const returnTrack = this.tracksDb.updateTrack(id, newInfo);
    return returnTrack;
  }
  deletetrack(id: string) {
    if (!this.tracksDb.validateId(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    const track = this.tracksDb.getTrackById(id);
    if (!track) {
      throw new NotFoundException('User not found');
    }
    this.tracksDb.deleteTrackById(id);
  }
}
