import { Injectable, } from '@nestjs/common';
// import { LoggerService } from './core/logger/logger.service';
import { DataBaseService } from './database/database.service';
import { CacheService } from './core/cache/cache.service';
import { LoggerService } from './core/logger/logger.service';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // constructor(private readonly configService: ConfigService){}
  private context = 'AppService'
  constructor(
    private readonly logger: LoggerService,
    private readonly databaseService: DataBaseService,
    private readonly cacheService: CacheService
  ) { }
  // constructor(){}
  async getHello() {
    this.logger.log('xxx', this.context, { userId: 123, isPremium: true })
    console.log('test');

    this.databaseService.user.findMany()
    await this.cacheService.set('key', 'Hello World!', 1000)
    const valueFromCache = await this.cacheService.get('key')
    console.log('valueFromCache', valueFromCache);

    // throw new Error('bad req')
    return 'Hello World!'
  }
}
