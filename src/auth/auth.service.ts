import { Inject, Injectable } from "@nestjs/common";
import { AuthUser } from "./dto/auth.dto";
import { DatabaseService } from "src/database/database.service";
@Injectable({})
export class AuthService{
    @Inject(DatabaseService)
    private readonly usersDb: DatabaseService;
    signup(newUser: AuthUser) {
        this.usersDb.addUser(newUser); // Add the new user to the database
        return { newUser };
    }
    signin() {
        return {msg: 'signin'}
    }
}