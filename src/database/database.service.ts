import { Injectable } from '@nestjs/common';
import { AuthUser } from "../auth/dto/auth.dto";
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/db/db';
@Injectable()
export class DatabaseService {
    public usersDb: User[] = [];
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
    getUsersDb(): User[] {
        return this.usersDb; // Method to return the usersDb array
    }
    generateUuid(): string {
        const uuid = uuidv4(); // Generate UUIDv4
        return uuid;
    }
    generateCurrentTime(): number {
        const now = new Date().getTime(); // Generate UUIDv4
        return now;
    }
    findAll(): User[] {
        return this.usersDb;
      }
    // constructor() {
    //     super({
    //         datasourses: {
    //             db: {
    //                 url: './db/'
    //             }
    //         }
    //     })
    // }
}
