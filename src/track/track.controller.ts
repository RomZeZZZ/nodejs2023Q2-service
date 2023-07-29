import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackReq, UpdateTrackDto } from './dto/track.dto';

@Controller('track')
export class TrackController {
    constructor(private trackService: TrackService) {}
    @HttpCode(200)
    @Get()
    getTracks(){
        return this.trackService.getTracks();
    }
    @HttpCode(200)
    @Get(':id')
    getTrack(@Param('id') id: string){
        return this.trackService.getTrack(id);
    }
    @HttpCode(201)
    @Post()
    createTrack(@Body() newTrackRequestData: TrackReq){
        return this.trackService.createTrack(newTrackRequestData);
    }
    @HttpCode(200)
    @Put(':id')
    changeTrackInformation(@Body() dto: UpdateTrackDto, @Param('id') id: string){
        return this.trackService.updateTrack(dto, id);
    }
    @HttpCode(204)
    @Delete(':id')
    deleteTrack(@Param('id') id: string){
        this.trackService.deletetrack(id);
    }
}
