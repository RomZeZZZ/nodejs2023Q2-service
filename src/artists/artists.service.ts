import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ArtistReq, UpdateArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistsService {
    @Inject(DatabaseService)
    private readonly artistsDb: DatabaseService;
    getArtists() {
        return this.artistsDb.getArtistsDb() // Return all tracks
    }
    getArtist(id: string) {
        if (!this.artistsDb.validateId(id)) {
            throw new BadRequestException('Invalid Artist ID'); // 400
        }
        const artist = this.artistsDb.getArtistById(id);
        if (!artist) {
            throw new NotFoundException('Artist not found'); // 404
        }
        return artist;
    }
    createArtist(newArtistRequestData: ArtistReq) {
        const artist = this.artistsDb.addArtist(newArtistRequestData);
        return artist; 
    }
    updateArtist(newInfo: UpdateArtistDto, id: string) {
        if (!this.artistsDb.validateId(id)) {
            throw new BadRequestException('Invalid Artist ID');
        }
        const artist = this.artistsDb.getArtistById(id);
        if (!artist) {
            throw new NotFoundException('Artist not found');
        }
        const returnArtist = this.artistsDb.updateArtist(id, newInfo);
        return returnArtist;
    } 
    deleteArtist(id: string) {
        if (!this.artistsDb.validateId(id)) {
            throw new BadRequestException('Invalid Artist ID');
        }
        const artist = this.artistsDb.getArtistById(id);
        if (!artist) {
            throw new NotFoundException('Artist not found');
        }
        this.artistsDb.deleteArtistById(id);
    } 
}
