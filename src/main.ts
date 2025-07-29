import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    bufferLogs: true, // 使用自定义logger
  });
  app.useLogger(app.get(LoggerService))
  app.use(helmet()) // 使用helmet中间件，隐藏某些容易有安全问题的响应头
   // 添加全局验证管道
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, // 启用白名单，未声明的属性舍弃
  }));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
