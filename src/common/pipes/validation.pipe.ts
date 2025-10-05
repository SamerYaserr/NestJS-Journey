import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform<T>(value: T, metadata: ArgumentMetadata): T {
    return value;
  }
}
