import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrayerController } from './prayer.controller';
import { PrayerService } from './prayer.service';
import { Prayer } from './entities/prayer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prayer])],
  controllers: [PrayerController],
  providers: [PrayerService]
})
export class PrayerModule {}
