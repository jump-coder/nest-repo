import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { LoggerService } from './core/logger/logger.service';
// import { createMock, DeepMocked } from '@golevelup/ts-jest'
import { createMock } from '@golevelup/ts-jest'
import { DataBaseService } from './database/database.service';
import { CacheService } from './core/cache/cache.service';
import { mockDeep } from 'jest-mock-extended'

describe('AppService', () => {
  let appService: AppService;
  // let cacheService: DeepMocked<CacheService>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers:
        [
          AppService,
          {
            provide: LoggerService,
            useValue: createMock<LoggerService>()
          },
          {
            provide: DataBaseService,
            useValue: createMock<DataBaseService>()
          },
          {
            provide: CacheService,
            useValue: mockDeep<CacheService>() // 使用mockDeep方法支持数据库测试，@golevelup/ts-jest不支持数据库测试
          },
        ],
    }).compile();

    appService = app.get<AppService>(AppService);
    // cacheService = app.get(CacheService)
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      // cacheService.get.mockResolvedValue('Hello World!')
      const result = await appService.getHello()
      expect(result).toBe('Hello World!');
    });
  });
});
