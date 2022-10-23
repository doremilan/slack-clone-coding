import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

//마지막 데이터를 한번 더 가공해 주는 역할로 사용하도록 만든 인터셉터
@Injectable()
export class UndifinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //전 부분 사용 안함,,
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
  }
}
