import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';

import { HotelIdReadDto } from '../hotel/hotel.dto.in';
import { OrmPageReadDto } from '../orm/orm.dto.in';
import { Room } from './room.entity';

export class RoomCreateDto extends PickType(Room, [ 'singleBed', 'doubleBed', 'number', 'price' ] as const) { }

export class RoomPageReadDto extends IntersectionType(
  PartialType(OrmPageReadDto),
  PartialType(PickType(Room, [ 'singleBed', 'doubleBed', 'number' ] as const)),
) {

  @ApiProperty({ example: 57, description: 'Minimum price', nullable: true })
  @IsOptional() @IsNumber() @IsPositive()
  public minPrice?: number;

  @ApiProperty({ example: 123.45, description: 'Maximum price', nullable: true })
  @IsOptional() @IsNumber() @IsPositive()
  public maxPrice?: number;

}

export class RoomIdsReadDto extends HotelIdReadDto {

  @ApiProperty({ example: '8b672d9f-cf5c-412e-90ff-c32d2ae8a096', description: 'Room ID' })
  @IsUUID()
  public roomId: string;

}

export class RoomUpdateDto extends PartialType(PickType(Room, [ 'singleBed', 'doubleBed', 'number', 'price' ] as const)) { }
