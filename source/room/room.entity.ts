import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsISO8601, IsNumber, IsObject, IsUUID, ValidateNested } from 'class-validator';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Booking } from '../booking/booking.entity';
import { Hotel } from '../hotel/hotel.entity';
import { OrmUuidTimestampEntity } from '../orm/orm.entity';

@Entity()
export class Room extends OrmUuidTimestampEntity {

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
