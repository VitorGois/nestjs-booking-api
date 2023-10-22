import { IntersectionType, PickType } from '@nestjs/swagger';

import { OrmUuidEntity } from '../orm/orm.entity';
import { Address } from './address.entity';

export class AddressDto extends IntersectionType(
  OrmUuidEntity,
  PickType(Address, [ 'street', 'number', 'district', 'city', 'state', 'zipcode' ] as const),
) {}
