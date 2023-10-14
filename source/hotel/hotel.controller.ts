import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';

import { HotelCreateDto, HotelIdReadDto, HotelPageReadDto, HotelUpdateDto } from './hotel.dto.in';
import { HotelDto, HotelPageDto } from './hotel.dto.out';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {

  public constructor(
    private readonly hotelService: HotelService,
  ) {}

  @Post()
  public postHotel(@Body() body: HotelCreateDto): Promise<HotelDto> {
    return this.hotelService.createHotel(body);
  }

  @Get()
  public getHotel(@Query() query: HotelPageReadDto): Promise<HotelPageDto> {
    return this.hotelService.readHotel(query);
  }

  @Get(':id')
  public getHotelById(@Param() params: HotelIdReadDto): Promise<HotelDto> {
    return this.hotelService.readHotelById(params.id);
  }

  @Patch(':id')
  public patchHotelById(@Param() params: HotelIdReadDto, @Body() body: HotelUpdateDto): Promise<HotelDto> {
    return this.hotelService.updateHotelById(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteHotelById(@Param() params: HotelIdReadDto): Promise<void> {
    return this.hotelService.deleteHotelById(params.id);
  }

}
