import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KAFKA_CLIENT_CONFIG } from './config/kafka';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Nest has an example implementation of a hybrid application on Github
  // https://github.com/nestjs/nest/tree/master/sample/03-microservices
  // https://github.com/nestjs/nest/blob/master/sample/03-microservices/src/main.ts
  // allows listening to events
  app.connectMicroservice(KAFKA_CLIENT_CONFIG);
  await app.startAllMicroservices();
  await app.listen(3000);
  console.log(`User service is running on ${await app.getUrl()}`);
}
bootstrap();
