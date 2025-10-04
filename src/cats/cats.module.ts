import { Module } from '@nestjs/common';
import { CatController } from './cats.controller';

@Module({
  controllers: [CatController],
  providers: [],
})
export class CatModule {}
