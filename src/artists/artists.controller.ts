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
import { ArtistsService } from './artists.service';
import { ArtistReq, UpdateArtistDto } from './dto/artist.dto';
@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @HttpCode(200)
  @Get()
  async getArtists() {
    return await this.artistsService.getArtists();
  }
  @HttpCode(200)
  @Get(':id')
  async getArtist(@Param('id') id: string) {
    return await this.artistsService.getArtist(id);
  }
  @HttpCode(201)
  @Post()
  async createArtist(@Body() newArtistRequestData: ArtistReq) {
    return await this.artistsService.createArtist(newArtistRequestData);
  }
  @HttpCode(200)
  @Put(':id')
  async updateArtist(
    @Body() newInfoArtist: UpdateArtistDto,
    @Param('id') id: string,
  ) {
    return await this.artistsService.updateArtist(newInfoArtist, id);
  }
  @HttpCode(204)
  @Delete(':id')
  async deleteArtist(@Param('id') id: string) {
    await this.artistsService.deleteArtist(id);
  }
}
