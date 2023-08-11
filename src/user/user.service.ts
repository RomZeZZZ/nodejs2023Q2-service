import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthUser, UpdatePasswordDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/User';
import { Repository } from 'typeorm';
import { v4 as uuidv4, validate as validateUuid } from 'uuid';
import { instanceToPlain } from 'class-transformer';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  async createUser(newUser: AuthUser) {
    const user = new UserEntity();
    user.id = this.generateUuid();
    user.login = newUser.login;
    user.password= newUser.password;
    user.version = 1,
    user.createdAt = this.generateCurrentTime();
    user.updatedAt = this.generateCurrentTime();
    await this.usersRepository.manager.save(user);
    return instanceToPlain(user);
  }
  async getUsers(): Promise<UserEntity[]>  {
    return this.usersRepository.find();
  }
  async getUser(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid user ID'); // 400
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found'); // 404
    }
    return instanceToPlain(user);
  }
  async deleteuser(id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.delete(id);
  }
  async updatePassword(newPass: UpdatePasswordDto, id: string) {
    if (!this.validateId(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== newPass.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }
    user.password = newPass.newPassword;
    user.version = user.version + 1;
    user.updatedAt = this.generateCurrentTime();
    await this.usersRepository.save(user);
    return instanceToPlain(user);
  }
  generateUuid(): string {
    const uuid = uuidv4();
    return uuid;
  }
  validateId(id: string): boolean {
    return validateUuid(id);
  }
  generateCurrentTime(): number {
    const now = new Date().getTime(); 
    return now;
  }
}
