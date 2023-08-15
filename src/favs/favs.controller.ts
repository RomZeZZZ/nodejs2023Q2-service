import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}
  @HttpCode(200)
  @Get()
  async getTracks() {
    return await this.favsService.getFavs();
  }
  @HttpCode(201)
  @Post('track/:id')
  async addTrack(@Param('id') newTrackId: string) {
    return await this.favsService.addTrack(newTrackId);
  }
  @HttpCode(204)
  @Delete('track/:id')
  async deleteTrack(@Param('id') id: string) {
    await this.favsService.deleteTrackFromFav(id);
  }
  @HttpCode(201)
  @Post('album/:id')
  async addAlbum(@Param('id') newAlbumId: string) {
    return await this.favsService.addAlbum(newAlbumId);
  }
  @HttpCode(204)
  @Delete('album/:id')
  async deleteAlbum(@Param('id') id: string) {
    await this.favsService.deleteAlbumFromFav(id);
  }
  @HttpCode(201)
  @Post('artist/:id')
  async addArtist(@Param('id') newArtistId: string) {
    return await this.favsService.addArtist(newArtistId);
  }
  @HttpCode(204)
  @Delete('artist/:id')
  async deleteArtist(@Param('id') id: string) {
    await this.favsService.deleteArtistFromFav(id);
  }
}
