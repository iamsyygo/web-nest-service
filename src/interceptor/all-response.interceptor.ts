import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class AllResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const b = Date.now();
    return next.handle().pipe(
      map((data) => {
        // 如果是文件流，修改请求头
        // if (data instanceof Buffer) {
        //   const res = context.switchToHttp().getResponse();
        //   res.setHeader('Content-Type', 'application/octet-stream');
        //   res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURI('文件名'));
        //   return data;
        // }

        const f = Date.now();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        return {
          code: 200,
          data,
          message: '请求成功',
          timestamp: f - b + 'ms',
          url: request.url,
          success: true,
        };
      }),
    );
  }
}
