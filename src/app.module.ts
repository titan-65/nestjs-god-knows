import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SermonModule } from './sermon/sermon.module';
import { PrayerModule } from './prayer/prayer.module';
import { BibleStudyModule } from './bible-study/bible-study.module';
import { User } from './auth/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [User],
    synchronize: true,
  }), AuthModule, UsersModule, SermonModule, PrayerModule, BibleStudyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
