import { CreateUserDto } from './dto/create-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_SERVICE') private client: ClientProxy,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const user = this.userRepository.create({
      id,
      ...createUserDto,
    });

    console.log(user);

    this.client.emit('user_created', {
      user,
    });

    return user;
  }
}
