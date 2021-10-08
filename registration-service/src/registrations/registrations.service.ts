import { CreateRegistrationDto } from './dto/create-registration.dto';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Registration, Status } from './entities/registration.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationsRepository: Repository<Registration>,
  ) {}

  async create(createRegistrationDto: CreateRegistrationDto) {
    const status = this.assessAge(createRegistrationDto.userAge);

    const id = uuidv4();

    const registration = this.registrationsRepository.create({
      id,
      status,
      ...createRegistrationDto,
    });

    return await this.registrationsRepository.save(registration);
  }

  private assessAge(age: number) {
    if (age >= 18) {
      return Status.APPROVED;
    }

    return Status.REJECTED;
  }
}
