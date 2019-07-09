import * as Nest from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Converts response data to `{ result: data }` JSON format.
 *
 * @interceptor
 */
@Nest.Injectable()
export class ResultInterceptor implements Nest.NestInterceptor {
  public intercept(context: Nest.ExecutionContext, next: Nest.CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((result) => ({ result })),
      );
  }
}
