import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumberString, IsObject, IsOptional, IsString, IsUUID, Length, ValidateNested } from 'class-validator';

import { AddressCreateDto, AddressUpdateDto } from '../address/address.dto.in';
import { OrmPageReadDto } from '../orm/orm.dto.in';
import { HotelRating } from './hotel.enum';

export class HotelCreateDto {

  @IsString() @IsNotEmpty()
  public name: string;

  @ValidateNested()
  @IsObject()
  @Type(() => AddressCreateDto)
  public address: AddressCreateDto;

  @IsNumberString() @Length(11, 11)
  public contact_phone: string;

  @IsEnum(HotelRating)
  public rating: HotelRating;

}

export class HotelPageReadDto extends OrmPageReadDto {

  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @IsOptional()
  @IsNumberString() @Length(11, 11)
  public contact_phone?: string;

  @IsOptional()
  @IsEnum(HotelRating)
  public rating?: HotelRating;

  @IsOptional()
  @IsString() @IsNotEmpty()
  public city?: string;

  @IsOptional()
  @IsString() @IsNotEmpty()
  public state?: string;

}

export class HotelUpdateDto {

  @IsOptional()
  @IsString() @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsNumberString() @Length(11, 11)
  public contact_phone: string;

  @IsOptional()
  @IsEnum(HotelRating)
  public rating: HotelRating;

  @IsOptional()
  @ValidateNested()
  @IsObject()
  @Type(() => AddressUpdateDto)
  public address: AddressUpdateDto;

}

export class HotelIdReadDto {

  @IsUUID()
  public id: string;

}
