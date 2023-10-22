import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

import { OrmPageReadDto } from '../orm/orm.dto.in';
import { User } from './user.entity';

export class UserCreateDto extends PickType(User, [ 'name', 'email', 'taxId', 'phone', 'birthdate' ] as const) { }

export class UserPageReadDto extends IntersectionType(
  PartialType(OrmPageReadDto),
  PartialType(PickType(User, [ 'name', 'email', 'taxId', 'phone', 'birthdate' ] as const)),
) { }

export class UserUpdateDto extends PartialType(PickType(User, [ 'name', 'taxId', 'phone', 'birthdate' ] as const)) { }
