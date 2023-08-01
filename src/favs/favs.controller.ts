import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}
  @HttpCode(200)
  @Get()
  getTracks() {
    return this.favsService.getFavs();
  }
  @HttpCode(201)
  @Post('track/:id')
  addTrack(@Param('id') newTrackId: string) {
    return this.favsService.addTrack(newTrackId);
  }
  @HttpCode(204)
  @Delete('track/:id')
  deleteTrack(@Param('id') id: string) {
    this.favsService.deleteTrackFromFav(id);
  }
  @HttpCode(201)
  @Post('album/:id')
  addAlbum(@Param('id') newAlbumId: string) {
    return this.favsService.addAlbum(newAlbumId);
  }
  @HttpCode(204)
  @Delete('album/:id')
  deleteAlbum(@Param('id') id: string) {
    this.favsService.deleteAlbumFromFav(id);
  }
  @HttpCode(201)
  @Post('artist/:id')
  addArtist(@Param('id') newArtistId: string) {
    return this.favsService.addArtist(newArtistId);
  }
  @HttpCode(204)
  @Delete('artist/:id')
  deleteArtist(@Param('id') id: string) {
    this.favsService.deleteArtistFromFav(id);
  }
}
