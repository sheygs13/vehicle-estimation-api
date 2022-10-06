import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      name: 'session',
      keys: ['testSecret'],
    }),
  );
  app.setGlobalPrefix('api/v1');
  // whitelist:true strips off any property
  // not defined in our  request dto
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
