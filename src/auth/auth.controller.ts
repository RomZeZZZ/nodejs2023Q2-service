import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './dto/auth.dto';
import { Public } from '../constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signUpDto: Auth) {
    return await this.authService.signup(signUpDto);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Auth) {
    return await this.authService.signIn(signInDto.login, signInDto.password);
  }
}
