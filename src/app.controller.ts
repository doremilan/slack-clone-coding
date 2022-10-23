import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

//요청을 받아서 검증, 서비스에서 받은 결과를 응답 처리하는 역할만 수행
@Controller('abc') // router와 같은 기능!
export class AppController {
  constructor(
    private readonly appService: AppService, //@Inject('custom_key') private readonly customValue
  ) {}

  @Get('user') // GET /abc/user
  getUser(): string {
    return this.appService.getUser();
  }

  @Post('user') // Post /abc/user
  postUser(): string {
    return this.appService.postUser();
  }
}
