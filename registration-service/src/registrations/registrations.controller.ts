import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('registrations')
export class RegistrationsController {
  @EventPattern('user_created')
  async registerUser(data: Record<string, unknown>) {
    console.log(data);
  }
}
