import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntites: true,
      entities: [], //'entities/*.js'
      synchronize: true, //한번 연결 후 false로 바꿔줘야함
      logging: true,
      keepConnectionAlive: true,
      charset: 'utf8mb4', //이모티콘 사용을 위해 추가
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  // [ 원래 모습은 아래와 같으나, 위 처럼 줄일 수 있음 > 아래와 같이 쓸 경우 사용할 때 다르게 씀 -> controller 체크
  //  {
  //    provide: AppService, > '고유한 키'가 들어감, 클래스를 넣는다면 클래스 이름을 고유한 키로 사용하여 작동함
  //    useClass: AppService, > '값'이 들어감, 그 키에 대해서 이 값을 쓰겠다 라는 의미
  //  },
  //  {
  //    provide: 'custom_key'
  //    useClass: custom_value
  //  },
  //  {
  //    provide: AppService,
  //    useFactory: () => {
  //        별의 별 작업
  //      return {}
  //}
  //  }
  // ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*'); //미들웨어는 consumer에 연결한다.
  }
}
