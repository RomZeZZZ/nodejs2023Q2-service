import { Injectable } from '@nestjs/common';
import { AuthUser } from "../user/dto/user.dto";
import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { Track, User } from 'src/db/db';
import { TrackReq, UpdateTrackDto } from 'src/track/dto/track.dto';
@Injectable()
export class DatabaseService {
    public usersDb: User[] = [];
    public tracksDb: Track[] = [];
    addUser(userData: AuthUser){
        const newUser = {
            id: this.generateUuid(), // uuid v4
            login: userData.login,
            password: userData.password,
            version: 1, // integer number, increments on update
            createdAt: this.generateCurrentTime(), // timestamp of creation
            updatedAt: this.generateCurrentTime()
        };
        this.usersDb.push(newUser);
        return newUser;
    }
    updateUserPassword(id: string, newPassword: string){
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
        const user = this.tracksDb.find((track) => track.id === id);
        return user ? user : null; // Method to return the track by id
    }
    addTrack(newTrackRequestData: TrackReq){
        const newTrack = {
            id: this.generateUuid(), // uuid v4
            name: newTrackRequestData.name,
            artistId: newTrackRequestData.artistId || null,
            albumId: newTrackRequestData.albumId || null,
            duration: newTrackRequestData.duration
        };
        this.tracksDb.push(newTrack);
        return newTrack;
    }
    updateTrack(id: string, newInfo: UpdateTrackDto){
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
