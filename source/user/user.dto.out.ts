import { Type } from 'class-transformer';
import { IsEmail, IsISO8601, IsNotEmpty, IsNumberString, IsObject, IsString, Length, ValidateNested } from 'class-validator';

import { OrmPageDto } from '../orm/orm.dto.out';
import { UserIdReadDto } from './user.dto.in';

export class UserDto extends UserIdReadDto {

  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsEmail()
  public email!: string;

  @IsNumberString()
  @Length(11, 14)
  public tax_id!: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11)
  public phone!: string;

  @IsISO8601()
  public birthdate!: string;

}

export class UserPageDto extends OrmPageDto<UserDto> {

  @IsObject() @Type(() => UserDto)
  @ValidateNested({ each: true })
  public records: UserDto[];

}
