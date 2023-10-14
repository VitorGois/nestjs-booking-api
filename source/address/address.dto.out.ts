import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPositive, IsString, Length } from 'class-validator';

import { AddressIdReadDto } from './address.dto.in';

export class AddressDto extends AddressIdReadDto {

  @IsString() @IsNotEmpty()
  public street: string;

  @IsOptional()
  @IsInt() @IsPositive()
  public number?: number;

  @IsString() @IsNotEmpty()
  public city: string;

  @IsString() @IsNotEmpty()
  public district: string;

  @IsString() @IsNotEmpty()
  public state: string;

  @IsNumberString() @Length(8, 8)
  public zipcode: string;

}

