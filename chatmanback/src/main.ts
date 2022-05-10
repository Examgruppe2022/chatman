import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*', allowedHeaders: '*' },
  });

  const config = new DocumentBuilder()
    .setTitle('chatman')
    .setDescription('The main stream Chat')
    .setVersion('0.1A')
    .addTag('chat')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(80);
}
bootstrap();
