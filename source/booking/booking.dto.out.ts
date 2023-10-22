import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsISO8601, IsObject, ValidateNested } from 'class-validator';

import { HotelDto } from '../hotel/hotel.dto.out';
import { HotelRoomDto } from '../hotel-room/hotel-room.dto.out';
import { OrmPageDto } from '../orm/orm.dto.out';
import { OrmUuidEntity } from '../orm/orm.entity';
import { UserDto } from '../user/user.dto.out';
import { BookingStatus } from './booking.enum';

export class BookingDto extends OrmUuidEntity {

  @IsInt()
  public guests: number;

  @IsISO8601()
  public checkInDate: Date;

  @IsISO8601()
  public checkoutDate: Date;

  @IsEnum(BookingStatus)
  public status: BookingStatus;

  @IsObject() @Type(() => UserDto)
  public user: UserDto;

  @IsObject() @Type(() => HotelDto)
  public hotel: HotelDto;

  @IsObject() @Type(() => HotelRoomDto)
  public room: HotelRoomDto;

}

export class BookingPageDto extends OrmPageDto<BookingDto> {

  @IsObject() @Type(() => BookingDto)
  @ValidateNested({ each: true })
  public records: BookingDto[];

}
