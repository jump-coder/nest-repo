// 全局模块
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from '../config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import { LoggerService } from './logger/logger.service';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // 确保 ConfigService 在整个应用中可用，无需在其他模块重复导入 ConfigModule。
            load: [config],
        }), // 用于加载和管理应用程序配置的核心方法。它允许你从各种来源（如 .env 文件、YAML 文件或自定义配置对象）读取配置变量，并在整个应用程序中注入这些配置
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR, // NestJS 提供的内置令牌（token），用于标识全局拦截器。当使用这个令牌时，Nest 会将对应的拦截器应用到整个应用的所有路由上。
            useClass: TransformResponseInterceptor, // 指定具体的拦截器类（TransformResponseInterceptor），表示用这个类来实现全局拦截逻辑。
        },
        LoggerService
    ],
    exports: [LoggerService]
})
export class CoreModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        /**
         * configure 是 NestJS 模块生命周期中的一个方法，用于配置中间件。
         * apply() 方法用于指定要应用的中间件（这里是 LoggerMiddleware）。
         * forRoutes() 方法指定中间件要应用的路由。'*' 表示匹配所有路由，即全局应用该中间件。
         */
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
