import { PartialType, PickType } from '@nestjs/swagger';

import { Address } from './address.entity';

export class AddressCreateDto extends PickType(Address, [ 'street', 'number', 'city', 'district', 'state', 'zipcode' ] as const) { }

export class AddressUpdateDto extends PartialType(
  PickType(Address,
    [ 'street', 'number', 'city', 'district', 'state', 'zipcode' ] as const,
  ),
) { }
