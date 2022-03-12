import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrayerController } from './prayer.controller';
import { PrayerService } from './prayer.service';
import { Prayer } from './entities/prayer.entity';
import {UsersModule} from '../users/users.module';
import {AuthModule} from '../auth/auth.module';
import {User} from '../users/entities/user.entity';

@Module({
  imports: [
      UsersModule,
      AuthModule,
      TypeOrmModule.forFeature([Prayer, User])],
  controllers: [PrayerController],
  providers: [PrayerService]
})
export class PrayerModule {}
