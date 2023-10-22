import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsObject, IsUUID, ValidateNested } from 'class-validator';

import { OrmPageDto } from '../orm/orm.dto.out';

export class HotelRoomDto {

  @IsUUID()
  public id: string;

  @IsInt()
  public singleBed: number;

  @IsInt()
  public doubleBed: number;

  @IsInt()
  public number: number;

  @IsNumber()
  public price: number;

}

export class HotelRoomPageDto extends OrmPageDto<HotelRoomDto> {

  @IsObject() @Type(() => HotelRoomDto)
  @ValidateNested({ each: true })
  public records: HotelRoomDto[];

}
