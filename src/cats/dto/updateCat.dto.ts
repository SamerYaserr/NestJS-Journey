import { PartialType } from '@nestjs/mapped-types';
import { CreateCatDto } from './createCat.dto';

export class UpdateCatDto extends PartialType(CreateCatDto) {}
