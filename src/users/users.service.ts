import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
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

    async findUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async createUser(user: Partial<CreateUserDto>): Promise<void> {
        const newUser = await this.userRepository.create(user);

        await this.userRepository.save(newUser);
    }

    async update(id: number, user: User): Promise<User> {
        user.id = id;
        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
