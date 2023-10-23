import { ApiProperty, IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

import { OrmPageReadDto } from '../orm/orm.dto.in';
import { Booking } from './booking.entity';

export class BookingCreateDto extends PickType(Booking, [ 'guests', 'checkInDate', 'checkoutDate', 'status' ] as const) {

  @ApiProperty({
    type: String,
    example: '8b672d9f-cf5c-412e-90ff-c32d2ae8a096',
    description: 'User ID who made the booking',
  })
  @IsUUID()
  public user: string;

  @ApiProperty({
    type: String,
    example: '8b672d9f-cf5c-412e-90ff-c32d2ae8a096',
    description: 'Hotel ID where the booking was made',
  })
  @IsUUID()
  public hotel: string;

  @ApiProperty({
    type: String,
    example: '8b672d9f-cf5c-412e-90ff-c32d2ae8a096',
    description: 'Room ID where the booking was made',
  })
  @IsUUID()
  public room: string;

}

export class BookingPageReadDto extends IntersectionType(
  PartialType(OrmPageReadDto),
  PartialType(PickType(BookingCreateDto, [ 'user', 'hotel', 'room', 'status' ] as const)),
) { }

export class BookingUpdateDto extends PartialType(PickType(Booking, [ 'guests', 'status' ] as const)) { }

export class BookingIdReadDto {

  @IsUUID()
  public bookingId: string;

}
