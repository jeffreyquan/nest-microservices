import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsUUID, IsEnum, IsInt } from 'class-validator';

export enum Status {
  PENDING = 'pending',
  REJECTED = 'rejected',
  APPROVED = 'approved',
}

@Entity()
export class Registration {
  @PrimaryColumn()
  @IsUUID(4)
  id: string;

  @Column({ unique: true })
  @IsUUID(4)
  userId: string;

  @Column()
  @IsInt()
  userAge: number;

  @Column()
  @IsEnum(Status)
  status: string;
}
