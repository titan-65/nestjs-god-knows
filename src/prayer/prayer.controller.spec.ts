import { Test, TestingModule } from '@nestjs/testing';
import { PrayerController } from './prayer.controller';

describe('PrayerController', () => {
  let controller: PrayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrayerController],
    }).compile();

    controller = module.get<PrayerController>(PrayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
