import { IsOptional, IsEnum, IsUUID } from 'class-validator';
import { RegistrationStatus } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  age?: number;

  @IsUUID(4)
  registrationId: string;

  @IsEnum(RegistrationStatus)
  registrationStatus: string;
}
