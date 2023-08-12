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
  async getUsers() {
    return await this.userService.getUsers();
  }
  @HttpCode(200)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }
  @HttpCode(201)
  @Post()
  async signup(@Body() dto: AuthUser) {
    return await this.userService.createUser(dto);
  }
  @HttpCode(200)
  @Put(':id')
  async changePassword(@Body() dto: UpdatePasswordDto, @Param('id') id: string) {
    return await this.userService.updatePassword(dto, id);
  }
  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteuser(id);
  }
}
