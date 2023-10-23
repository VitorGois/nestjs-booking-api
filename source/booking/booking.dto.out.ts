import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';

import { HotelDto } from '../hotel/hotel.dto.out';
import { OrmPageDto } from '../orm/orm.dto.out';
import { OrmUuidEntity } from '../orm/orm.entity';
import { RoomDto } from '../room/room.dto.out';
import { UserDto } from '../user/user.dto.out';
import { Booking } from './booking.entity';

export class BookingDto extends IntersectionType(
  OrmUuidEntity,
  PickType(Booking, [ 'guests', 'checkInDate', 'checkoutDate', 'status' ] as const),
) {

  @ApiProperty({
    type: UserDto,
    description: 'User who made the booking',
  })
  @IsObject() @Type(() => UserDto)
  public user: UserDto;

  @ApiProperty({
    type: HotelDto,
    description: 'Hotel where the booking was made',
  })
  @IsObject() @Type(() => HotelDto)
  public hotel: HotelDto;

  @ApiProperty({
    type: RoomDto,
    description: 'Room where the booking was made',
  })
  @IsObject() @Type(() => RoomDto)
  public room: RoomDto;

}

export class BookingPageDto extends OrmPageDto<BookingDto> {

  @ApiProperty({
    type: BookingDto,
    isArray: true,
    description: 'List of bookings',
  })
  @IsObject() @Type(() => BookingDto)
  @ValidateNested({ each: true })
  public records: BookingDto[];

}
