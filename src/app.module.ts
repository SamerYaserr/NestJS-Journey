import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import cors from 'cors';
import { CatModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CatController } from './cats/cats.controller';

@Module({
  imports: [CatModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
      )
      .forRoutes(CatController);
  }
}
