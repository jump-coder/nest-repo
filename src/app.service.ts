import { Injectable, } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private context = 'AppService'
  // constructor(private readonly configService: ConfigService){}
  constructor(private readonly logger: LoggerService) { }
  // constructor(){}
  getHello() {
    this.logger.log('xxxx', this.context, {
      userId: 123,
      isPremium: true
    })
    // throw new Error('bad req')
    return 'Hello World!'
  }
}
