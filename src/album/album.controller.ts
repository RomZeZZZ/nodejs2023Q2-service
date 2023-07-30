import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumReq, UpdateAlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
    constructor(private albumService: AlbumService) {}
    @HttpCode(200)
    @Get()
    getAlbums(){
        return this.albumService.getAlbums();
    }
    @HttpCode(200)
    @Get(':id')
    getAlbum(@Param('id') id: string){
        return this.albumService.getAlbum(id);
    }
    @HttpCode(201)
    @Post()
    createAlbum(@Body() newAlbumRequestData: AlbumReq){
        return this.albumService.createAlbum(newAlbumRequestData);
    }
    @HttpCode(200)
    @Put(':id')
    updateAlbum(@Body() newInfoAlbum: UpdateAlbumDto, @Param('id') id: string){
        return this.albumService.updateAlbum(newInfoAlbum, id);
    }
    @HttpCode(204)
    @Delete(':id')
    deleteAlbum(@Param('id') id: string){
        this.albumService.deleteAlbum(id);
    }
}
