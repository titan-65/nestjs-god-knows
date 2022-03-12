import {Controller, Get, Post, Body, Param, Put, Delete, Redirect, HttpCode, HttpStatus, UseGuards, Req} from '@nestjs/common';
import { PrayerService } from './prayer.service';
import { PrayerCreateDto } from './dto/prayer-create.dto';
import { PrayerDto} from './dto/prayer.dto';
import {Prayer} from './entities/prayer.entity';
import {AuthGuard} from '@nestjs/passport';
import {UserDto} from '../users/dto/user.dto';

@Controller('prayer')
export class PrayerController {
    constructor(private readonly prayerService: PrayerService) { }

    @Get()
    async findAll(): Promise<Prayer[]> {
        return await this.prayerService.findAll();
    }

    @Get(':id')
    async findPrayer(@Param('id') id: string) {
        return await this.prayerService.findPrayer(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    async createPrayer(@Body() prayer: PrayerCreateDto, @Req() req: any): Promise<PrayerDto> {
        const user = req.user as UserDto;
        return await this.prayerService.createPrayer(user, prayer);
    }

    @Put('/:id/content')
    @UseGuards(AuthGuard())
    async updatePrayer(@Param('id') id: string, @Body() prayer: any) {
        return await this.prayerService.updatePrayer(id, prayer);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deletePrayer(@Param('id') id: string) {
        return await this.prayerService.deletePrayer(id);
    }

}
