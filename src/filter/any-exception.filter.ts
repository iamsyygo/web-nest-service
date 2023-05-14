import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // 获取管道 class-validator 的错误信息
    // console.log(exception);

    const isHttpException = exception instanceof HttpException;
    // prettier-ignore
    // const error = isHttpException ? (exception as HttpException).message : (exception as unknown as Error).stack;
    let error = ''
    if (isHttpException) {
      const response = exception.getResponse() as any;
      error = typeof response === 'string' ? response : response.message;
    } else {
      error = (exception as unknown as Error).stack;
    }
    const message = isHttpException ? '请求失败' : '服务器内部错误';
    // prettier-ignore
    const status = isHttpException ? (exception as HttpException).getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      code: status,
      message,
      error,
      uri: request.url,
      timestamp: new Date().toLocaleString(),
      success: false,
    });
  }
}
