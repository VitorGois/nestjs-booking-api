import { IsEmail, IsISO8601, IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID, Length } from 'class-validator';

import { OrmPageReadDto } from '../orm/orm.dto.in';

export class UserCreateDto {

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsNumberString()
  @Length(11, 14)
  public tax_id: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  public phone: string;

  @IsISO8601()
  public birthdate: string;

}

export class UserPageReadDto extends OrmPageReadDto {

  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @IsNumberString()
  @Length(11, 14)
  public tax_id?: string;

  @IsOptional()
  @IsString() @IsNotEmpty()
  @Length(11, 11)
  public phone?: string;

  @IsOptional()
  @IsISO8601()
  public birthdate?: string;

}

export class UserUpdateDto {

  @IsOptional()
  @IsString() @IsNotEmpty()
  public name?: string;

  @IsOptional()
  @IsNumberString()
  @Length(11, 14)
  public tax_id?: string;

  @IsOptional()
  @IsString() @IsNotEmpty()
  @Length(11, 11)
  public phone?: string;

  @IsOptional()
  @IsISO8601()
  public birthdate?: string;

}

export class UserIdReadDto {

  @IsUUID()
  public id: string;

}
