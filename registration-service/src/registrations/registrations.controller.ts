import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { KAFKA_TOPICS } from 'src/config/kafka';
import { RegistrationsService } from './registrations.service';

@Controller('registrations')
export class RegistrationsController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
    private readonly registrationsService: RegistrationsService,
  ) {}

  @EventPattern(KAFKA_TOPICS.USER_REGISTRATION_PENDING)
  async registerUser(data: Record<string, any>) {
    const { user } = data.value;

    console.log(
      `User with ID ${user.id}, name ${user.name} and age ${user.age} was submitted for registration with status of ${user.registrationStatus}. User being assessed.`,
    );

    const registration = await this.registrationsService.create({
      userId: user.id,
      userAge: user.age,
    });

    console.log(
      `User assessment complete. Status of registration: ${registration.status}`,
    );

    this.kafkaClient.emit(KAFKA_TOPICS.USER_REGISTRATION_FULFILLED, {
      userId: user.id,
      registrationId: registration.id,
      registrationStatus: registration.status,
    });
  }
}
