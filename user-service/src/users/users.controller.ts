import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { KAFKA_TOPICS } from 'src/config/kafka';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('KAFKA_CLIENT') private readonly kafkaClient: ClientKafka,
    private readonly usersService: UsersService,
  ) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    console.log(
      `User with name ${user.name} and age ${user.age} was created and submitted for registration with status of: ${user.registrationStatus}`,
    );

    this.kafkaClient.emit(KAFKA_TOPICS.USER_REGISTRATION_PENDING, {
      user,
    });

    return user;
  }

  @EventPattern(KAFKA_TOPICS.USER_REGISTRATION_FULFILLED)
  async updateStatus(data: Record<string, any>) {
    const { userId, registrationId, registrationStatus } = data.value;

    console.log(
      `Registration ID ${registrationId} for user ${userId} has been completed with a status of: ${registrationStatus}`,
    );

    const user = await this.usersService.update(userId, {
      registrationId,
      registrationStatus,
    });

    console.log(`Status updated from pending to ${user.registrationStatus}`);
  }
}
