import { IsNotEmpty } from "class-validator";
export class AuthUser {
    @IsNotEmpty()
    login: string;
    @IsNotEmpty()
    password: string
}