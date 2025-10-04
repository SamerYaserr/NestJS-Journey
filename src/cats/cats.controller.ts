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
} from '@nestjs/common';
import type { Request } from 'express';
import { CreateCatDto } from './dto/createCat.dto';
import { UpdateCatDto } from './dto/updateCat.dto';

@Controller('cats')
export class CatController {
  @Get()
  findAll(
    @Req() req: Request,
    @Query('age') age: number,
    @Query('breed') breed: string,
  ): string {
    return `This action returns all cats. Age: ${age}, Breed: ${breed}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;
  }

  @Post()
  @HttpCode(204)
  create(@Body() createCatDto: CreateCatDto): string {
    return 'This action adds a new cat';
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
