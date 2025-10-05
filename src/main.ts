import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { CatchEverythingFilter } from './common/filters/catch-everything.filter';
import { RolesGuard } from './common/guards/roles.gaurd';
import { LoggingInterceptor } from './common/Interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new CatchEverythingFilter(httpAdapterHost),
  );

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.use(cors());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
