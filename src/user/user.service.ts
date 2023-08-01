import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { AuthUser, UpdatePasswordDto } from './dto/user.dto';
@Injectable()
export class UserService {
  @Inject(DatabaseService)
  private readonly usersDb: DatabaseService;
  createUser(newUser: AuthUser) {
    const user = this.usersDb.addUser(newUser);
    const modifiedUser = Object.assign({}, user);
    delete modifiedUser.password;
    return modifiedUser;
  }
  getUsers() {
    return this.usersDb.getUsersDb(); // Return all users in the database
  }
  getUser(id: string) {
    if (!this.usersDb.validateId(id)) {
      throw new BadRequestException('Invalid user ID'); // 400
    }
    const user = this.usersDb.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found'); // 404
    }
    return user;
  }
  deleteuser(id: string) {
    if (!this.usersDb.validateId(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    const user = this.usersDb.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.usersDb.deleteUserById(id);
  }
  updatePassword(newPass: UpdatePasswordDto, id: string) {
    if (!this.usersDb.validateId(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    const user = this.usersDb.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== newPass.oldPassword) {
      throw new ForbiddenException('Old password is wrong'); //403
    }
    const returnUser = this.usersDb.updateUserPassword(id, newPass.newPassword);
    const modifiedUser = Object.assign({}, returnUser);
    delete modifiedUser.password;
    return modifiedUser;
  }
}
