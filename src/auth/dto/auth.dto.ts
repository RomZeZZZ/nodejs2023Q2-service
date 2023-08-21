import { IsNotEmpty } from 'class-validator';
export class Auth {
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  password: string;
}
