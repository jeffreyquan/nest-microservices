import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
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

    this.kafkaClient.emit('user_created', {
      user,
    });

    return user;
  }

  @EventPattern('user_registered')
  updateStatus(data: Record<string, unknown>) {
    console.log(data.value);
  }
}
