import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KAFKA_CLIENT_CONFIG } from 'src/config/kafka';
import { Registration } from './entities/registration.entity';
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
    TypeOrmModule.forFeature([Registration]),
  ],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
