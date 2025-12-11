import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpPort = process.env.PORT ?? 3000;
  await app.listen(httpPort);
  console.log(`App is listening on port ${httpPort}`);
}
bootstrap();
