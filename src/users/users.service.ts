import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async create(user: User): Promise<User> {
        const newUser = await this.userRepository.create(user);

        return await this.userRepository.save(newUser);
    }

    async update(id: number, user: User): Promise<User> {
        user.id = id;
        return await this.userRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
