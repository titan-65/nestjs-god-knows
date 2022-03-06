import { Controller, Get, Post, Body, Param, NotFoundException, Put, Delete, HttpCode, HttpStatus, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/user.service';

@Controller('auth')
export class AuthController {
    constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  // @Get('me')
  // async me(@Body() user: User) {
  //   return this.authService.me(user);
  // }
  //
  // @Put('me')
  // async update(@Body() user: User) {
  //   return this.userService.update(user);
  // }
  //
  // @Delete('me')
  // async delete(@Body() user: User) {
  //   return this.userService.delete(user);
  // }
}
