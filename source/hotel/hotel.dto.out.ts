import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumberString, IsObject, IsString, Length, ValidateNested } from 'class-validator';

import { AddressDto } from '../address/address.dto.out';
import { OrmPageDto } from '../orm/orm.dto.out';
import { HotelIdReadDto } from './hotel.dto.in';
import { HotelRating } from './hotel.enum';

export class HotelDto extends HotelIdReadDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @IsObject() @Type(() => AddressDto)
  @ValidateNested()
  public address: AddressDto;

  @IsNumberString() @Length(11, 11)
  public contact_phone: string;

  @IsEnum(HotelRating)
  public rating: HotelRating;

}

export class HotelPageDto extends OrmPageDto<HotelDto> {

  @IsObject() @Type(() => HotelDto)
  @ValidateNested({ each: true })
  public records: HotelDto[];

}
