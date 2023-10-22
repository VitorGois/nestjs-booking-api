import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';

import { OrmUuidReadDto } from '../orm/orm.dto.in';
import { HotelCreateDto, HotelPageReadDto, HotelUpdateDto } from './hotel.dto.in';
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

  @Get('deleted')
  public getSoftDeletedHotel(@Query() query: HotelPageReadDto): Promise<HotelPageDto> {
    return this.hotelService.readSoftDeletedHotel(query);
  }

  @Get(':id')
  public getHotelById(@Param() params: OrmUuidReadDto): Promise<HotelDto> {
    return this.hotelService.readHotelById(params.id);
  }

  @Patch(':id')
  public patchHotelById(@Param() params: OrmUuidReadDto, @Body() body: HotelUpdateDto): Promise<HotelDto> {
    return this.hotelService.updateHotelById(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteHotelById(@Param() params: OrmUuidReadDto): Promise<void> {
    return this.hotelService.deleteHotelById(params.id);
  }

  @Put(':id/restore')
  public restoreSoftDeletedHotelById(@Param() params: OrmUuidReadDto): Promise<HotelDto> {
    return this.hotelService.restoreSoftDeletedHotelById(params.id);
  }

}
