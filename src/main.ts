import { NestFactory } from '@nestjs/core';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpPort = process.env.PORT ?? 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  addSwagger(app);

  await app.listen(httpPort);
  console.log(`App is listening on port ${httpPort}`);
}
bootstrap();

function addSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Basic Web Server API')
    .setDescription('API for basic web server example')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
