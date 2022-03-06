import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
        private readonly usersService: UsersService,
    ) { }


    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findUserByEmail(email);
        if ( user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
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
