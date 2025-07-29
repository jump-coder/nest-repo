import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // ... before route handler
    // return next.handle();
    // 此处将返回的数据包裹data属性
    return next.handle().pipe(map(response=>{
      if(!response){
        return {
          data: {}
        }
      }
      if(response.data && response.meta){
        return {
          data: response.data,
          meta: response.meta
        }
      }
      return {data:response}
    })); // ... after route handler
  }
}
