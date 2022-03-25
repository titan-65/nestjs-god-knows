import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SermonModule } from './sermon/sermon.module';
import { PrayerModule } from './prayer/prayer.module';
import { BibleStudyModule } from './bible-study/bible-study.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ThrottlerModule} from '@nestjs/throttler';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: [`.env.stage.development`, `.env.stage.production`],
      }),
      ThrottlerModule.forRoot({
        ttl: 60,
        limit: 10,
      }),
    CacheModule.register(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
      }),
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
