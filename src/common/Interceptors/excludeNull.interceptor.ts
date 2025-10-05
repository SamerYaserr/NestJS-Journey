import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor<T> implements NestInterceptor<T, T | ''> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<T | ''> {
    return next
      .handle()
      .pipe(map((value: T | null) => (value === null ? '' : value)));
  }
}
