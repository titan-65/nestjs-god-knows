import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    NotFoundException,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
    Redirect,
    Request,
    UseGuards,
    HttpException
} from '@nestjs/common';
import { AuthGuard} from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthCredentialsDto} from './dto/auth-credentials.dto';
import { UsersService } from '../users/users.service';
import {LocalAuthGuard} from './local-auth.guard';
import {RegistrationStatusInterface} from './registration-status.interface';
import {LoginUserDto} from '../users/dto/login-user.dto';
import {LoginStatusInterface} from './login-status.interface';

@Controller('auth')
export class AuthController {
    constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatusInterface> {
      const result: RegistrationStatusInterface = await this.authService.register(createUserDto);
      if (!result.success) {
          throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
      }
      return result;
  }

  @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatusInterface> {
        return await this.authService.login(loginUserDto);
  }
  // @UseGuards(LocalAuthGuard)
  // @Post('/local/login')
  // async loginOne(@Request() req) {
  //     return req.user;
  // }
  //
  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // async login(@Request() req) {
  //     return this.authService.login(req.user);
  // }
  //
  // @Post('signup')
  // async register(@Body() user: AuthCredentialsDto) {
  //   return this.usersService.createUser(user);
  // }

}
