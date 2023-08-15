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
import { AlbumService } from './album.service';
import { AlbumReq, UpdateAlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @HttpCode(200)
  @Get()
  async getAlbums() {
    return await this.albumService.getAlbums();
  }
  @HttpCode(200)
  @Get(':id')
  async getAlbum(@Param('id') id: string) {
    return await this.albumService.getAlbum(id);
  }
  @HttpCode(201)
  @Post()
  async createAlbum(@Body() newAlbumRequestData: AlbumReq) {
    return await this.albumService.createAlbum(newAlbumRequestData);
  }
  @HttpCode(200)
  @Put(':id')
  async updateAlbum(
    @Body() newInfoAlbum: UpdateAlbumDto,
    @Param('id') id: string,
  ) {
    return await this.albumService.updateAlbum(newInfoAlbum, id);
  }
  @HttpCode(204)
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    await this.albumService.deleteAlbum(id);
  }
}
