import { IsNotEmpty } from 'class-validator';
export class AuthUser {
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  password: string;
}
export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;
  @IsNotEmpty()
  newPassword: string;
}
