import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SermonModule } from './sermon/sermon.module';
import { PrayerModule } from './prayer/prayer.module';
import { BibleStudyModule } from './bible-study/bible-study.module';
import { Auth } from './auth/entities/auth.entity';
import { User } from './users/entities/user.entity';
import { Prayer } from './prayer/entities/prayer.entity';
import {ConfigModule} from '@nestjs/config';
import {ThrottlerModule} from '@nestjs/throttler';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      ThrottlerModule.forRoot({
        ttl: 60,
        limit: 10,
      }),
      CacheModule.register(),
      TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'god-knows',
    autoLoadEntities: true,
    // entities: [Auth, User, Prayer],
    synchronize: true,
  }),
    AuthModule,
    UsersModule,
    SermonModule,
    PrayerModule,
    BibleStudyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
