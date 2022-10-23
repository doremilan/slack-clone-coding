import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

//요청과 응답에 대해서는 모름, 순수하게 실행해야하는 비즈니스 로직만 수행 후 결과 값 전달, 비즈니스 로직 중복 제거 역할도 함
@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getUser(): string {
    return this.configService.get('DB_PASSWORD'); // process.env.DB.PASSWORD 와 같은 의미, configService를 통해 가져와 NEST에서 관리할 수 있도록 함, test에 용이함
  }

  postUser(): string {
    return 'Hello World!';
  }
}
