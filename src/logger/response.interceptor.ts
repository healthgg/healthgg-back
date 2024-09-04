import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // 이미 data 객체인 경우 그대로 반환
        if (data && data.data) {
          return data;
        }
        // 그렇지 않은 경우 data로 감싸서 반환
        return { data };
      }),
    );
  }
}
