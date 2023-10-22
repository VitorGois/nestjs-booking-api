import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

import { AddressCreateDto, AddressUpdateDto } from '../address/address.dto.in';
import { OrmPageReadDto } from '../orm/orm.dto.in';
import { Hotel } from './hotel.entity';

export class HotelCreateDto extends PickType(Hotel, [ 'name', 'contactPhone', 'rating' ] as const) {

  @ApiProperty({
    type: AddressCreateDto,
    description: 'Hotel address.',
  })
  @ValidateNested()
  @IsObject()
  @Type(() => AddressCreateDto)
  public address: AddressCreateDto;

}

export class HotelPageReadDto extends IntersectionType(
  PartialType(OrmPageReadDto),
  PartialType(PickType(Hotel, [ 'name', 'contactPhone', 'rating' ] as const)),
) {

  @ApiProperty({
    type: String,
    example: 'Sorocaba ',
    description: 'Hotel city location.',
    nullable: true,
  })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public city?: string;

  @ApiProperty({
    type: String,
    example: 'São Paulo',
    description: 'Hotel state location.',
    nullable: true,
  })
  @IsOptional()
  @IsString() @IsNotEmpty()
  public state?: string;

}

export class HotelUpdateDto extends IntersectionType(
  PartialType(PickType(Hotel, [ 'name', 'contactPhone', 'rating' ] as const)),
  PartialType(AddressUpdateDto),
) { }

export class HotelIdReadDto {

  @ApiProperty({ example: '8b672d9f-cf5c-412e-90ff-c32d2ae8a096', description: 'Hotel ID' })
  @IsUUID()
  public hotelId: string;

}
