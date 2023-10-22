import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { HotelIdReadDto } from '../hotel/hotel.dto.in';
import { OrmPageReadDto } from '../orm/orm.dto.in';

export class HotelRoomCreateDto {

  @IsInt()
  public singleBed: number;

  @IsInt()
  public doubleBed: number;

  @IsInt()
  public number: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  public price: number;

}

export class HotelRoomPageReadDto extends OrmPageReadDto {

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string))
  @IsInt()
  public singleBed?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string))
  @IsInt()
  public doubleBed?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string))
  @IsNumber({ maxDecimalPlaces: 2 })
  public minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string))
  @IsNumber({ maxDecimalPlaces: 2 })
  public maxPrice?: number;

}

export class HotelRoomHotelIdReadDto {

  @IsUUID()
  public hotelId: string;

}

export class HotelRoomIdsReadDto extends HotelIdReadDto {

  @IsUUID()
  public roomId: string;

}

export class HotelRoomUpdateDto {

  @IsOptional()
  @IsInt()
  public singleBed?: number;

  @IsOptional()
  @IsInt()
  public doubleBed?: number;

  @IsOptional()
  @IsInt()
  public number?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  public price?: number;

}
