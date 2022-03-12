import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {toUserDto} from '../shared/mapper';
import {LoginUserDto} from './dto/login-user.dto';
import {UserDto} from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async findOneUser(options?: object): Promise<UserDto> {
        const user = await this.userRepository.findOne(options);
        return toUserDto(user);
    }

    /**
     * Login user
     * @param username
     * @param password
     */

    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
        }
        return toUserDto(user);
    }

    /**
     * FindByPayload
     * @param username
     */
    async findByPayload({username}: any): Promise<UserDto> {
        return await this.findOneUser({
            where: {
                username,
            },
        });
    }
    //
    // async findUserByEmail(email: string): Promise<User> {
    //     return await this.userRepository.findOne({ where: { email } });
    // }
    //
    // async findUserByUsername(username: string): Promise<User> {
    //     return await this.userRepository.findOne({ where: { username } });
    // }
    /**
     * Create user
     * @param createUserDto
     */
    async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
        const {firstName, lastName, username, email, password } = createUserDto;
        // check if user exists
        const userInDb = await this.userRepository.findOne({ where: { username } });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user: User = await this.userRepository.create({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
        });

        try {
            await this.userRepository.save(user);
            return toUserDto(user);
        } catch (error) {
            // TODO: handle error using enumerations using error codes on nestjs
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    }

    async update(id: number, user: User): Promise<User> {
        user.id = id;
        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
