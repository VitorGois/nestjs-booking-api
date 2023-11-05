import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsISO8601, IsNotEmpty, IsNumberString, IsObject, IsString, IsUUID, Length, ValidateNested } from 'class-validator';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Address } from '../address/address.entity';
import { Booking } from '../booking/booking.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';
import { Room } from '../room/room.entity';
import { HotelRating } from './hotel.enum';

@Entity()
export class Hotel extends OrmUuidTimestampEntity {

  @ApiProperty({ example: '8b672d9f-cf5c-412e-90ff-c32d2ae8a096' })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  @IsISO8601()
  @Index()
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  public createdAt!: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  @IsISO8601()
  @Index()
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  public updatedAt!: Date;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z', nullable: true })
  @IsISO8601()
  @Index()
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deletedAt?: Date;

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
    example: HotelRating.ECO,
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
