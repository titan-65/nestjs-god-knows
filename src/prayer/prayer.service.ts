import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prayer } from './entities/prayer.entity';
import { PrayerCreateDto} from './dto/prayer-create.dto';
import { PrayerDto } from './dto/prayer.dto';
import {UserDto} from '../users/dto/user.dto';
import {UsersService} from '../users/users.service';

@Injectable()
export class PrayerService {
    constructor(
        @InjectRepository(Prayer)
        private readonly prayerRepository: Repository<Prayer>,
        private readonly usersService: UsersService,
    ) {}

    async findAll(): Promise<Prayer[]> {
        return await this.prayerRepository.find();
    }

    async findPrayer(id: string): Promise<Prayer> {
        const prayer =  await this.prayerRepository.findOne(id);

        if (!prayer) {
            throw new NotFoundException(`Prayer with ID "${id}" not found`);
        }

        return prayer;
    }

    async createPrayer({username}: UserDto, prayer: PrayerCreateDto): Promise<PrayerDto> {

        const owner = await this.usersService.findOneUser({ where: { username } });
        const newPrayer = this.prayerRepository.create(prayer);

        return await this.prayerRepository.save(newPrayer);

    }

    async updatePrayer(id: string, prayer: PrayerCreateDto): Promise<PrayerDto> {
        // const updatedPrayer = await this.prayerRepository.findOne(id);
        const currentPrayer = await this.findPrayer(id);
        const updatedPrayer = this.prayerRepository.merge(currentPrayer, prayer);

        return await this.prayerRepository.save(updatedPrayer);
    }

    async deletePrayer(id: string): Promise<Prayer> {
        const deletedPrayer = await this.findPrayer(id);
        return await this.prayerRepository.remove(deletedPrayer);
    }
}
