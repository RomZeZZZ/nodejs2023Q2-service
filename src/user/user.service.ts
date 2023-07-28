import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class UserService {
    @Inject(DatabaseService)
    private readonly usersDb: DatabaseService;
    getUsers() {
        console.log(this.usersDb.getUsersDb())
        return this.usersDb.getUsersDb(); // Return all users in the database
    }
}
