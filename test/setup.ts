import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
// import { LoggerService } from '../src/core/logger/logger.service';
import helmet from 'helmet';
import { DataBaseService } from '../src/database/database.service';
import { CacheService } from '../src/core/cache/cache.service';

let app: INestApplication<App>;
let server: any;
let databaseService: DataBaseService;
let cacheService: CacheService;

beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 不需要日志输出
    // app.useLogger(app.get(LoggerService))
    app.use(helmet()) // 使用helmet中间件，隐藏某些容易有安全问题的响应头
    // 添加全局验证管道
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // 启用白名单，未声明的属性舍弃
    }));
    await app.init();
    server = app.getHttpServer()
    databaseService = app.get(DataBaseService)
    cacheService = app.get(CacheService)
});

afterEach(async () => {
    // 每个测试结束后，重置环境
    await cacheService.reset()
    await databaseService.reset()
})

afterAll(async () => {
    await app.close()
})

export {
    server, databaseService
}