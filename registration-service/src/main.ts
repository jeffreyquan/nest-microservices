import { KAFKA_CLIENT_CONFIG } from 'src/config/kafka';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(KAFKA_CLIENT_CONFIG);
  await app.startAllMicroservices();
  await app.listen(5000);
}
bootstrap();
