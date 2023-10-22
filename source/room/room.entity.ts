import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { Booking } from '../booking/booking.entity';
import { Hotel } from '../hotel/hotel.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
export class Room extends OrmUuidTimestampEntity {

  @ApiProperty({ example: 1, description: 'Number of single beds' })
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value as string))
  @Column({ type: 'int2' })
  public singleBed!: number;

  @ApiProperty({ example: 2, description: 'Number of double beds' })
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value as string))
  @Column({ type: 'int2' })
  public doubleBed!: number;

  @ApiProperty({ example: 14, description: 'Room number' })
  @IsInt()
  @Transform(({ value }) => Number.parseInt(value as string))
  @Column({ type: 'int2' })
  public number!: number;

  @ApiProperty({ example: 124.99, description: 'Price per night' })
  @IsNumber()
  @Transform(({ value }) => Number.parseInt(value as string))
  @Column({ type: 'numeric' })
  public price!: number;

  @ApiProperty({ type: Hotel, description: 'Hotel' })
  @IsObject() @Type(() => Hotel) @ValidateNested()
  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  @JoinColumn({ name: 'hotelId' })
  public hotel!: Hotel;

  @ApiProperty({ type: Booking, isArray: true, description: 'Bookings' })
  @IsObject() @Type(() => Booking) @ValidateNested({ each: true })
  @OneToMany(() => Booking, (booking) => booking.user, { onDelete: 'CASCADE', cascade: true })
  public bookings!: Booking[];

}
