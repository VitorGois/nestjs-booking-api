import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { Booking } from '../booking/booking.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
@Unique([ 'email' ])
@Unique([ 'taxId' ])
export class User extends OrmUuidTimestampEntity {

  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString() @IsNotEmpty()
  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @ApiProperty({ example: 'john.doe@mail.com', description: 'User email' })
  @IsEmail()
  @Column({ type: 'varchar', length: 255, unique: true })
  public email!: string;

  @ApiProperty({ example: '13025884860', description: 'User tax ID' })
  @IsNumberString() @Length(11, 11)
  @Column({ type: 'varchar', length: 11, unique: true })
  public taxId!: string;

  @ApiProperty({ example: '11987654321', description: 'User phone number' })
  @IsString() @IsNotEmpty() @Length(11, 11)
  @Column({ type: 'varchar', length: 11 })
  public phone!: string;

  @ApiProperty({ example: '2000-01-01', description: 'User birthdate' })
  @IsISO8601()
  @Column({ type: 'timestamp' })
  public birthdate!: string;

  @ApiProperty({ isArray: true, type: Booking, description: 'User bookings' })
  @OneToMany(() => Booking, (booking) => booking.user)
  public bookings: Booking[];

}
