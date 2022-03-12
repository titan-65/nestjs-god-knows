import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';
import { UsersService } from '../users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService} from '@nestjs/jwt';
import {RegistrationStatusInterface} from './registration-status.interface';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {LoginUserDto} from '../users/dto/login-user.dto';
import {JwtPayload} from './jwt.interface';
import {UserDto} from '../users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        // const user = await this.usersService.findUserByUsername(username);
        // if ( user && (await bcrypt.compare(password, user.password)) ) {
        //     const { ...result } = user;
        //     return result;
        // }
        // return null;
        const user = await this.usersService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async login(loginUserDto: LoginUserDto): Promise<any> {
        // const { id, username, firstName, lastName, email } = authCredentialsDto;
        // const payload = { id, username, firstName, lastName, email };
        const user = await this.usersService.findByLogin(loginUserDto);
        const token = this.jwtService.sign(user);
        return {
            expiresIn: 3600,
            user,
                token,
            };
    }
    async register(userDto: CreateUserDto): Promise<RegistrationStatusInterface> {
        let status: RegistrationStatusInterface = {
            success: true,
            message: 'user registered successfully',
        };
        try {
            await this.usersService.createUser(userDto);
        } catch (error) {
            status = {
                success: false,
                message: error.message,
            };
            }
        return status;
    }

    // async findByToken(token: string): Promise<Auth> {
    //     return await this.authRepository.findOne({ where: { token } });
    // }
    //
    // async create(userId: number): Promise<Auth> {
    //     const auth = new Auth();
    //     auth.userId = userId;
    //     auth.token = AuthService.generateToken();
    //     return await this.authRepository.save(auth);
    // }

}
