import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private readonly userRepository: Repository<Auth>,
    ) { }
    
}
