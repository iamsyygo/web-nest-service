import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const isHttpException = exception instanceof HttpException;
    // prettier-ignore
    const error = isHttpException ? (exception as HttpException).message : (exception as unknown as Error).stack;
    const message = isHttpException ? '请求失败' : '服务器内部错误';
    // prettier-ignore
    const status = isHttpException ? (exception as HttpException).getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      code: status,
      message,
      error,
      url: request.url,
      timestamp: new Date().toLocaleString(),
      success: false,
    });
  }
}
