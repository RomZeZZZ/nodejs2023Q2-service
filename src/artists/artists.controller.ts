import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistReq, UpdateArtistDto } from './dto/artist.dto';
@Controller('artist')
export class ArtistsController {
    constructor(private artistsService: ArtistsService) {}
    @HttpCode(200)
    @Get()
    getArtists(){
        return this.artistsService.getArtists();
    }
    @HttpCode(200)
    @Get(':id')
    getArtist(@Param('id') id: string){
        return this.artistsService.getArtist(id);
    }
    @HttpCode(201)
    @Post()
    createArtist(@Body() newArtistRequestData: ArtistReq){
        return this.artistsService.createArtist(newArtistRequestData);
    }
    @HttpCode(200)
    @Put(':id')
    updateArtist(@Body() newInfoArtist: UpdateArtistDto, @Param('id') id: string){
        return this.artistsService.updateArtist(newInfoArtist, id);
    }
    @HttpCode(204)
    @Delete(':id')
    deleteArtist(@Param('id') id: string){
        this.artistsService.deleteArtist(id);
    }
}
