import { Module } from '@nestjs/common';
import { CatController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatController],
  providers: [CatsService],
})
export class CatModule {}
