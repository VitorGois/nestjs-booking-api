import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';
import { Column, Entity, OneToMany, Unique } from 'typeorm';

import { Booking } from '../booking/booking.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
@Unique([ 'email' ])
@Unique([ 'taxId' ])
export class User extends OrmUuidTimestampEntity {

  @ApiProperty({ example: 'John Doe' })
  @IsString() @IsNotEmpty()
  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @ApiProperty({ example: 'john.doe@mail.com' })
  @IsEmail()
  @Column({ type: 'varchar', length: 255, unique: true })
  public email!: string;

  @ApiProperty({ example: '13025884860' })
  @IsNumberString() @Length(11, 11)
  @Column({ type: 'varchar', length: 11, unique: true })
  public taxId!: string;

  @ApiProperty({ example: '11987654321' })
  @IsString() @IsNotEmpty() @Length(11, 11)
  @Column({ type: 'varchar', length: 11 })
  public phone!: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsISO8601()
  @Column({ type: 'timestamp' })
  public birthdate!: string;

  @OneToMany(() => Booking, (booking) => booking.user)
  public bookings: Booking[];

}
