import { Injectable } from '@nestjs/common';
import { AuthUser } from '../user/dto/user.dto';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { Album, Artist, Favorites, Track, User } from 'src/db/db';
import { TrackReq, UpdateTrackDto } from 'src/track/dto/track.dto';
import { ArtistReq, UpdateArtistDto } from 'src/artists/dto/artist.dto';
import { AlbumReq, UpdateAlbumDto } from 'src/album/dto/album.dto';
@Injectable()
export class DatabaseService {
  public usersDb: User[] = [];
  public tracksDb: Track[] = [];
  public artistsDb: Artist[] = [];
  public albumsDb: Album[] = [];
  public favsDb: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  //User-----------------------------------
  addUser(userData: AuthUser) {
    const newUser = {
      id: this.generateUuid(), // uuid v4
      login: userData.login,
      password: userData.password,
      version: 1, // integer number, increments on update
      createdAt: this.generateCurrentTime(), // timestamp of creation
      updatedAt: this.generateCurrentTime(),
    };
    this.usersDb.push(newUser);
    return newUser;
  }
  updateUserPassword(id: string, newPassword: string) {
    const userIndex = this.usersDb.findIndex((user) => user.id === id);
    this.usersDb[userIndex].password = newPassword;
    this.usersDb[userIndex].version += 1;
    this.usersDb[userIndex].updatedAt = this.generateCurrentTime();
    const returnUpdateuser = this.usersDb[userIndex];
    return returnUpdateuser;
  }
  getUsersDb(): User[] {
    return this.usersDb; // Method to return the usersDb array
  }
  getUserById(id: string): User | null {
    const user = this.usersDb.find((user) => user.id === id);
    return user ? user : null; // Method to return the user by id
  }
  deleteUserById(id: string) {
    const userIndex = this.usersDb.findIndex((user) => user.id === id);
    this.usersDb.splice(userIndex, 1);
  }
  // Track -----------------------------------
  getTracksDb(): Track[] {
    return this.tracksDb; // Method to return the tracksDb array
  }
  getTrackById(id: string): Track | null {
    const track = this.tracksDb.find((track) => track.id === id);
    return track ? track : null; // Method to return the track by id
  }
  addTrack(newTrackRequestData: TrackReq) {
    const newTrack = {
      id: this.generateUuid(), // uuid v4
      name: newTrackRequestData.name,
      artistId: newTrackRequestData.artistId || null,
      albumId: newTrackRequestData.albumId || null,
      duration: newTrackRequestData.duration,
    };
    this.tracksDb.push(newTrack);
    return newTrack;
  }
  updateTrack(id: string, newInfo: UpdateTrackDto) {
    const trackIndex = this.tracksDb.findIndex((track) => track.id === id);
    this.tracksDb[trackIndex].name = newInfo.name;
    this.tracksDb[trackIndex].duration = newInfo.duration;
    const returnTrack = this.tracksDb[trackIndex];
    return returnTrack;
  }
  deleteTrackById(id: string) {
    const trackIndex = this.tracksDb.findIndex((track) => track.id === id);
    this.tracksDb.splice(trackIndex, 1);
  }
  //Artist--------------------------------
  getArtistsDb(): Artist[] {
    return this.artistsDb; // Method to return the tracksDb array
  }
  getArtistById(id: string): Artist | null {
    const artist = this.artistsDb.find((artist) => artist.id === id);
    return artist ? artist : null; // Method to return the track by id
  }
  addArtist(newArtistRequestData: ArtistReq) {
    const newArtist = {
      id: this.generateUuid(), // uuid v4
      name: newArtistRequestData.name,
      grammy: newArtistRequestData.grammy,
    };
    this.artistsDb.push(newArtist);
    return newArtist;
  }
  updateArtist(id: string, newInfo: UpdateArtistDto) {
    const artistIndex = this.artistsDb.findIndex((artist) => artist.id === id);
    this.artistsDb[artistIndex].name = newInfo.name;
    this.artistsDb[artistIndex].grammy = newInfo.grammy;
    const returnArtist = this.artistsDb[artistIndex];
    return returnArtist;
  }
  deleteArtistById(id: string) {
    const artistIndex = this.artistsDb.findIndex((artist) => artist.id === id);
    const trackIndex = this.tracksDb.findIndex(
      (track) => track.artistId === id,
    );
    const albumIndex = this.albumsDb.findIndex(
      (album) => album.artistId === id,
    );
    if (trackIndex !== -1) {
      this.tracksDb[trackIndex].artistId = null;
    }
    if (albumIndex !== -1) {
      this.albumsDb[albumIndex].artistId = null;
    }
    this.artistsDb.splice(artistIndex, 1);
  }
  //Album--------------------------------------
  getAlbumsDb(): Album[] {
    return this.albumsDb;
  }
  getAlbumById(id: string): Album | null {
    const album = this.albumsDb.find((album) => album.id === id);
    return album ? album : null;
  }
  addAlbum(newAlbumRequestData: AlbumReq) {
    const newAlbum = {
      id: this.generateUuid(),
      name: newAlbumRequestData.name,
      year: newAlbumRequestData.year,
      artistId: newAlbumRequestData.artistId,
    };
    this.albumsDb.push(newAlbum);
    return newAlbum;
  }
  updateAlbum(id: string, newInfo: UpdateAlbumDto) {
    const albumIndex = this.albumsDb.findIndex((album) => album.id === id);
    this.albumsDb[albumIndex].name = newInfo.name;
    this.albumsDb[albumIndex].year = newInfo.year;
    this.albumsDb[albumIndex].artistId = newInfo.artistId;
    const returnAlbum = this.albumsDb[albumIndex];
    return returnAlbum;
  }
  deleteAlbumById(id: string) {
    const albumIndex = this.albumsDb.findIndex((album) => album.id === id);
    const trackIndex = this.tracksDb.findIndex((album) => album.albumId === id);
    if (trackIndex !== -1) {
      this.tracksDb[trackIndex].albumId = null;
    }
    this.albumsDb.splice(albumIndex, 1);
  }
  //Favs------------------------------------------
  getAllFavsDb(): Favorites {
    const returnTracks = [];
    const returnAlbums = [];
    const returnArtists = [];
    this.tracksDb.forEach((item) => {
      if (this.favsDb.tracks.includes(item.id)) {
        returnTracks.push(item);
      }
    });
    this.albumsDb.forEach((item) => {
      if (this.favsDb.albums.includes(item.id)) {
        returnAlbums.push(item);
      }
    });
    this.artistsDb.forEach((item) => {
      if (this.favsDb.artists.includes(item.id)) {
        returnArtists.push(item);
      }
    });
    return {
      artists: returnArtists,
      albums: returnAlbums,
      tracks: returnTracks,
    };
  }
  getFavTrackById(searchId: string): boolean {
    const favTrack = this.favsDb.tracks.find((id) => id === searchId);
    return favTrack ? true : false;
  }
  addFavTrackById(addId: string) {
    this.favsDb.tracks.push(addId);
    return this.favsDb.tracks;
  }
  deleteTrackFromFav(id: string) {
    const trackidIndex = this.favsDb.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (trackidIndex !== -1) {
      this.favsDb.tracks.splice(trackidIndex, 1);
    }
  }
  //favs/album -------------------------
  getFavAlbumById(searchId: string): boolean {
    const favAlbum = this.favsDb.albums.find((id) => id === searchId);
    return favAlbum ? true : false;
  }
  addFavAlbumById(addId: string) {
    this.favsDb.albums.push(addId);
    return this.favsDb.albums;
  }
  deleteAlbumFromFav(id: string) {
    const albumidIndex = this.favsDb.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (albumidIndex !== -1) {
      this.favsDb.albums.splice(albumidIndex, 1);
    }
  }
  //favs/artist -------------------------
  getFavArtistById(searchId: string): boolean {
    const favArtist = this.favsDb.artists.find((id) => id === searchId);
    return favArtist ? true : false;
  }
  addFavArtistById(addId: string) {
    this.favsDb.artists.push(addId);
    return this.favsDb.artists;
  }
  deleteArtistFromFav(id: string) {
    const artistIndex = this.favsDb.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (artistIndex !== -1) {
      this.favsDb.artists.splice(artistIndex, 1);
    }
  }
  //-------------------
  generateUuid(): string {
    const uuid = uuidv4(); // Generate UUIDv4
    return uuid;
  }
  validateId(id: string): boolean {
    return validateUuid(id);
  }
  generateCurrentTime(): number {
    const now = new Date().getTime(); // Generate current time
    return now;
  }
}
