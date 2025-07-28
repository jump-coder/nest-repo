import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService){}
  getHello() {
    const environmentVariable = this.configService.get<string>(`redis.host`)
    console.log(environmentVariable);
    
    return {
      data: 'Hello World!',
      meta:{
        pages: 10
      }
    };
  }
}
