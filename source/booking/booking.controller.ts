import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OrmUuidReadDto } from '../orm/orm.dto.in';
import { BookingCreateDto, BookingPageReadDto, BookingUpdateDto } from './booking.dto.in';
import { BookingDto, BookingPageDto } from './booking.dto.out';
import { BookingService } from './booking.service';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {

  public constructor(
    private readonly bookingService: BookingService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a booking', description: 'Create a booking and return the booking data' })
  @ApiResponse({ status: HttpStatus.CREATED, type: BookingDto, description: 'Booking created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid booking data.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Booking already exists.' })
  public postBooking(@Body() body: BookingCreateDto): Promise<BookingDto> {
    return this.bookingService.createBooking(body);
  }

  @Get()
  @ApiOperation({ summary: 'Read bookings', description: 'Read bookings by pagination' })
  @ApiResponse({ status: HttpStatus.OK, type: BookingPageDto, description: 'Booking list.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid filter params.' })
  public getBooking(@Query() query: BookingPageReadDto): Promise<BookingPageDto> {
    return this.bookingService.readBooking(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read booking', description: 'Read booking by id' })
  @ApiResponse({ status: HttpStatus.OK, type: BookingDto, description: 'Booking found.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid booking ID.' })
  public getBookingById(@Param() params: OrmUuidReadDto): Promise<BookingDto> {
    return this.bookingService.readBookingById(params.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update booking', description: 'Update booking by id' })
  @ApiResponse({ status: HttpStatus.OK, type: BookingDto, description: 'Booking updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid booking ID or data.' })
  public patchBookingById(@Param() params: OrmUuidReadDto, @Body() body: BookingUpdateDto): Promise<BookingDto> {
    return this.bookingService.updateBookingById(params.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete booking', description: 'Delete booking by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Booking deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Booking not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid booking ID.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteBookingById(@Param() params: OrmUuidReadDto): Promise<void> {
    return this.bookingService.deleteBookingById(params.id);
  }

}
