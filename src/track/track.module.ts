import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from '../entity/Track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity])],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
