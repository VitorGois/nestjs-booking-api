import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsObject, IsUUID, ValidateNested } from 'class-validator';

import { OrmPageDto } from '../orm/orm.dto.out';

export class HotelRoomDto {

  @IsUUID()
  public id: string;

  @IsInt()
  public single_bed: number;

  @IsInt()
  public double_bed: number;

  @IsInt()
  public number: number;

  @IsNumber()
  public price: number;

  @IsBoolean()
  public assigned: boolean;

}

export class HotelRoomPageDto extends OrmPageDto<HotelRoomDto> {

  @IsObject() @Type(() => HotelRoomDto)
  @ValidateNested({ each: true })
  public records: HotelRoomDto[];

}
