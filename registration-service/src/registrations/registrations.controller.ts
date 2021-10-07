import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';

@Controller('registrations')
export class RegistrationsController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
  ) {}

  @EventPattern('user_created')
  async registerUser(data: Record<string, unknown>) {
    console.log(data.value);
    this.kafkaClient.emit('user_registered', {
      registrationId: 'abcdef',
    });
  }
}
