import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/User.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { Auth } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersRepository.findOneBy({ login: username });
    if (!(await this.comparePasswords(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
  async signup(signUpDto: Auth) {
    return await this.usersService.createUser(signUpDto);
  }
  async comparePasswords(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }
}
