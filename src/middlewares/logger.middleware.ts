import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//그냥 nest morgan 써도 됨!
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP'); // context 서로 다른 콘솔 로그들 카테고라이징 해서 보여주는 설정

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    //라우터보다 먼저 실행됨, 위에 request 먼저 기록하고, finish할때 아래부분 실행되기 때문에 비동기로 response.on 하고있음.
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      // = Logger.log()
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next(); //미들웨어 사용 시, next() 써야지만 다음으로 넘어감.
  }
}
