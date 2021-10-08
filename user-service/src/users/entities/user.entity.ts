import { IsEnum, IsInt, IsString, IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum RegistrationStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}

@Entity()
export class User {
  @PrimaryColumn()
  @IsUUID(4)
  id: string;

  @Column({ unique: true })
  @IsString()
  name: string;

  @Column()
  @IsInt()
  age: number;

  @Column({ nullable: true, unique: true })
  @IsUUID(4)
  registrationId: string;

  @Column('text', { default: RegistrationStatus.PENDING })
  @IsEnum(RegistrationStatus)
  registrationStatus: string;
}
