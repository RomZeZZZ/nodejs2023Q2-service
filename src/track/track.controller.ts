import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackReq, UpdateTrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}
  @HttpCode(200)
  @Get()
  async getTracks() {
    return await this.trackService.getTracks();
  }
  @HttpCode(200)
  @Get(':id')
  async getTrack(@Param('id') id: string) {
    return await this.trackService.getTrack(id);
  }
  @HttpCode(201)
  @Post()
  async createTrack(@Body() newTrackRequestData: TrackReq) {
    return await this.trackService.createTrack(newTrackRequestData);
  }
  @HttpCode(200)
  @Put(':id')
  async changeTrackInformation(@Body() dto: UpdateTrackDto, @Param('id') id: string) {
    return await this.trackService.updateTrack(dto, id);
  }
  @HttpCode(204)
  @Delete(':id')
  async deleteTrack(@Param('id') id: string) {
    await this.trackService.deletetrack(id);
  }
}
