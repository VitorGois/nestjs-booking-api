import { IsEnum, IsInt, IsISO8601, IsOptional, IsPositive, IsUUID } from 'class-validator';

import { OrmPageReadDto } from '../orm/orm.dto.in';
import { BookingStatus } from './booking.enum';

export class BookingCreateDto {

  @IsInt() @IsPositive()
  public guests: number;

  @IsISO8601({ strict: true, strictSeparator: true })
  public checkInDate: string;

  @IsISO8601({ strict: true, strictSeparator: true })
  public checkoutDate: string;

  @IsEnum(BookingStatus)
  public status: BookingStatus;

  @IsUUID()
  public user: string;

  @IsUUID()
  public hotel: string;

  @IsUUID()
  public room: string;

}

export class BookingPageReadDto extends OrmPageReadDto {

  @IsOptional()
  @IsUUID()
  public user?: string;

  @IsOptional()
  @IsUUID()
  public hotel?: string;

  @IsOptional()
  @IsUUID()
  public room?: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  public status?: BookingStatus;

}

export class BookingUpdateDto {

  @IsOptional()
  @IsInt() @IsPositive()
  public guests?: number;

  @IsOptional()
  @IsEnum(BookingStatus)
  public status?: BookingStatus;

}

export class BookingIdReadDto {

  @IsUUID()
  public bookingId: string;

}
