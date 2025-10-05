import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Redirect,
  Param,
  Body,
  Query,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import type { Request } from 'express';
import { CreateCatDto } from './dto/createCat.dto';
import { UpdateCatDto } from './dto/updateCat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatController {
  constructor(private readonly catsService: CatsService) {}
  @Get('error')
  throwError() {
    throw new HttpException('This is a forced error.', HttpStatus.BAD_REQUEST);
  }

  @Get()
  findAll(
    @Req() req: Request,
    @Query('age') age: number,
    @Query('breed') breed: string,
  ): Cat[] {
    try {
      return this.catsService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Post()
  @HttpCode(204)
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 301)
  getDocs() {
    return { url: 'https://docs.nestjs.com' };
  }
}
