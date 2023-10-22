import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { AddressDto } from '../address/address.dto.out';
import { OrmPageDto } from '../orm/orm.dto.out';
import { OrmUuidEntity } from '../orm/orm.entity';
import { Hotel } from './hotel.entity';

export class HotelDto extends IntersectionType(
  OrmUuidEntity,
  PickType(Hotel, [ 'name', 'contactPhone', 'rating' ] as const),
) {

  @ApiProperty({
    type: AddressDto,
    description: 'Hotel address.',
  })
  @IsObject() @Type(() => AddressDto)
  @ValidateNested()
  public address: AddressDto;

}

export class HotelPageDto extends OrmPageDto<HotelDto> {

  @ApiProperty({
    type: HotelDto,
    isArray: true,
    description: 'Hotels.',
  })
  @IsObject() @Type(() => HotelDto)
  @ValidateNested({ each: true })
  public records: HotelDto[];

}
