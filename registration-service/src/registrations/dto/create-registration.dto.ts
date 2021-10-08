import { IsInt, IsUUID } from 'class-validator';

export class CreateRegistrationDto {
  @IsUUID()
  readonly userId: string;

  @IsInt()
  readonly userAge: number;
}
