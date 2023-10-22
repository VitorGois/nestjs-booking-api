import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumberString, IsObject, IsString, Length, ValidateNested } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { Address } from '../address/address.entity';
import { Booking } from '../booking/booking.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';
import { Room } from '../room/room.entity';
import { HotelRating } from './hotel.enum';

@Entity()
export class Hotel extends OrmUuidTimestampEntity {

  @ApiProperty({
    type: String,
    example: 'Hotel name',
    description: 'Hotel name.',
  })
  @IsString() @IsNotEmpty()
  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @ApiProperty({
    type: String,
    example: '11999999999',
    description: 'Hotel contact phone.',
  })
  @IsNumberString() @Length(11, 11)
  @Column({ type: 'varchar', length: 11 })
  public contactPhone!: string;

  @ApiProperty({
    enum: HotelRating,
    example: HotelRating.FIVE_STARS,
    description: 'Hotel rating.',
  })
  @IsEnum(HotelRating)
  @Column({ type: 'enum', enum: HotelRating })
  public rating!: HotelRating;

  @ApiProperty({
    type: Address,
    description: 'Hotel address.',
  })
  @ValidateNested() @IsObject() @Type(() => Address)
  @OneToOne(() => Address, { nullable: false, eager: true, onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'addressId' })
  public address!: Address;

  @ApiProperty({
    type: Room,
    isArray: true,
    description: 'Hotel rooms.',
  })
  @ValidateNested() @IsObject({ each: true }) @Type(() => Room)
  @OneToMany(() => Room, (room) => room.hotel, { onDelete: 'CASCADE', cascade: true })
  public rooms!: Room[];

  @ApiProperty({
    type: Booking,
    isArray: true,
    description: 'Hotel bookings.',
  })
  @ValidateNested() @IsObject({ each: true }) @Type(() => Room)
  @OneToMany(() => Booking, (booking) => booking.hotel)
  public bookings: Booking[];

}
