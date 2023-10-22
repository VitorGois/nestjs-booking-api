import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';

import { OrmUuidReadDto } from '../orm/orm.dto.in';
import { BookingCreateDto, BookingPageReadDto, BookingUpdateDto } from './booking.dto.in';
import { BookingDto, BookingPageDto } from './booking.dto.out';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {

  public constructor(
    private readonly bookingService: BookingService,
  ) { }

  @Post()
  public postBooking(@Body() body: BookingCreateDto): Promise<BookingDto> {
    return this.bookingService.createBooking(body);
  }

  @Get()
  public getBooking(@Query() query: BookingPageReadDto): Promise<BookingPageDto> {
    return this.bookingService.readBooking(query);
  }

  @Get(':id')
  public getBookingById(@Param() params: OrmUuidReadDto): Promise<BookingDto> {
    return this.bookingService.readBookingById(params.id);
  }

  @Patch(':id')
  public patchBookingById(@Param() params: OrmUuidReadDto, @Body() body: BookingUpdateDto): Promise<BookingDto> {
    return this.bookingService.updateBookingById(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteBookingById(@Param() params: OrmUuidReadDto): Promise<void> {
    return this.bookingService.deleteBookingById(params.id);
  }

}
