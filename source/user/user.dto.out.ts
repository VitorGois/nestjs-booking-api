import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { OrmPageDto } from '../orm/orm.dto.out';
import { OrmUuidEntity } from '../orm/orm.entity';
import { User } from './user.entity';

export class UserDto extends IntersectionType(OrmUuidEntity, PickType(User, [ 'name', 'email', 'taxId', 'phone', 'birthdate' ] as const)) { }

export class UserPageDto extends OrmPageDto<UserDto> {

  @ApiProperty({ isArray: true, type: UserDto, description: 'User list' })
  @IsObject() @Type(() => UserDto)
  @ValidateNested({ each: true })
  public records: UserDto[];

}
