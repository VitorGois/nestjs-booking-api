import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsISO8601, IsPositive, ValidateNested } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { Hotel } from '../hotel/hotel.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';
import { BookingStatus } from './booking.enum';

@Entity()
export class Booking extends OrmUuidTimestampEntity {

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Number of guests',
  })
  @IsInt() @IsPositive()
  @Column({ type: 'int2' })
  public guests!: number;

  @ApiProperty({
    type: Date,
    example: '2020-01-01T00:00:00.000Z',
    description: 'Check-in date, must be in UTC format!',
  })
  @IsISO8601({ strict: true, strictSeparator: true })
  @Column({ type: 'timestamp' })
  public checkInDate!: Date;

  @ApiProperty({
    type: Date,
    example: '2020-01-05T00:00:00.000Z',
    description: 'Check-out date, must be in UTC format!',
  })
  @IsISO8601({ strict: true, strictSeparator: true })
  @Column({ type: 'timestamp' })
  public checkoutDate!: Date;

  @ApiProperty({
    enum: BookingStatus,
    example: BookingStatus.PENDING,
    description: 'Booking status',
  })
  @IsEnum(BookingStatus)
  @Column({
    // type: 'enum',
    type: 'varchar',
    // enum: BookingStatus,
  })
  public status!: BookingStatus;

  @ApiProperty({
    type: User,
    description: 'User who made the booking',
  })
  @ValidateNested() @Type(() => User)
  @ManyToOne(() => User, (user) => user.bookings, { nullable: false })
  @JoinColumn({ name: 'userId' })
  public user!: User;

  @ApiProperty({
    type: Hotel,
    description: 'Hotel where the booking was made',
  })
  @ValidateNested() @Type(() => Hotel)
  @ManyToOne(() => Hotel, (hotel) => hotel.bookings, { nullable: false })
  @JoinColumn({ name: 'hotelId' })
  public hotel!: Hotel;

  @ApiProperty({
    type: Room,
    description: 'Room that was booked',
  })
  @ValidateNested() @Type(() => Room)
  @ManyToOne(() => Room, (room) => room.bookings, { nullable: false })
  @JoinColumn({ name: 'roomId' })
  public room!: Room;

}
