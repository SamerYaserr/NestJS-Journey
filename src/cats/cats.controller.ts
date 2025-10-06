import {
  Controller,
  Get,
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
  ParseIntPipe,
  DefaultValuePipe,
  ParseBoolPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCatDto } from './dto/createCat.dto';
import { UpdateCatDto } from './dto/updateCat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { RolesGuard } from 'src/common/guards/roles.gaurd';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LoggingInterceptor } from 'src/common/Interceptors/logging.interceptor';
import { User } from 'src/common/decorators/user.decorator';
import { Auth } from 'src/common/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CheckPolicies } from 'src/common/decorators/checkPolicies.decorator';
import { Article } from 'src/articles/article.class/article.class';
import { Action } from 'src/common/enums/action.enum';
import { ReadArticlePolicyHandler } from 'src/casl/handlers/read-article.policy';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatController {
  constructor(
    private readonly catsService: CatsService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Get('error')
  throwError() {
    throw new HttpException('This is a forced error.', HttpStatus.BAD_REQUEST);
  }

  @Get('user')
  @Auth('admin')
  findUser(@User() user: string) {
    return user;
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Article))
  @CheckPolicies(new ReadArticlePolicyHandler())
  findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
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
  findOne(@Param('id', ParseIntPipe) id: number): string {
    return `This action returns a #${id} cat`;
  }

  @Post()
  @Roles(Role.Admin)
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
