import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPositive, IsString, IsUUID, Length } from 'class-validator';

export class AddressCreateDto {

  @IsString() @IsNotEmpty()
  public street: string;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string))
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

export class AddressUpdateDto {

  @IsOptional()
  @IsString() @IsNotEmpty()
  public street?: string;

  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value as string))
  @IsInt() @IsPositive()
  public number?: number;

  @IsOptional()
  @IsString() @IsNotEmpty()
  public city?: string;

  @IsOptional()
  @IsString() @IsNotEmpty()
  public district?: string;

  @IsOptional()
  @IsString() @IsNotEmpty()
  public state?: string;

  @IsOptional()
  @IsNumberString() @Length(8, 8)
  public zipcode?: string;

}

export class AddressIdReadDto {

  @IsUUID()
  public id: string;

}
