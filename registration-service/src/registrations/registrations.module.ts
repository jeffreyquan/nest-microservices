import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_CLIENT_CONFIG } from 'src/config/kafka';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';

// https://github.com/nestjs/nest/blob/master/sample/03-microservices/src/math/math.module.ts
@Module({
  imports: [
    // allows publishing events
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        ...KAFKA_CLIENT_CONFIG,
      },
    ]),
  ],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
