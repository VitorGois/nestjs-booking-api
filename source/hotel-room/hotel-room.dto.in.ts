import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsUUID } from 'class-validator';

import { HotelIdReadDto } from '../hotel/hotel.dto.in';
import { OrmPageReadDto } from '../orm/orm.dto.in';

export class HotelRoomCreateDto {

  @IsInt()
  public single_bed: number;

  @IsInt()
  public double_bed: number;

  @IsInt()
  public number: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  public price: number;

}

export class HotelRoomPageReadDto extends OrmPageReadDto {

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string))
  @IsInt()
  public single_bed?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string))
  @IsInt()
  public double_bed?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string))
  @IsNumber({ maxDecimalPlaces: 2 })
  public min_price?: number;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string))
  @IsNumber({ maxDecimalPlaces: 2 })
  public max_price?: number;

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
  public single_bed?: number;

  @IsOptional()
  @IsInt()
  public double_bed?: number;

  @IsOptional()
  @IsInt()
  public number?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  public price?: number;

}
