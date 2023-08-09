import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUser, UpdatePasswordDto } from './dto/user.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @HttpCode(200)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }
  @HttpCode(200)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
  @HttpCode(201)
  @Post()
  signup(@Body() dto: AuthUser) {
    console.log('dto')
    return this.userService.createUser(dto);
  }
  @HttpCode(200)
  @Put(':id')
  changePassword(@Body() dto: UpdatePasswordDto, @Param('id') id: string) {
    return this.userService.updatePassword(dto, id);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.userService.deleteuser(id);
  }
}
