import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';

import { HotelIdReadDto } from '../hotel/hotel.dto.in';
import { HotelRoomCreateDto, HotelRoomHotelIdReadDto, HotelRoomIdsReadDto, HotelRoomPageReadDto, HotelRoomUpdateDto } from './hotel-room.dto.in';
import { HotelRoomDto, HotelRoomPageDto } from './hotel-room.dto.out';
import { HotelRoomService } from './hotel-room.service';

@Controller('hotels/:hotelId/rooms')
export class HotelRoomController {

  public constructor(
    private readonly hotelRoomService: HotelRoomService,
  ) { }

  @Post()
  public postHotelRoom(
    @Param() params: HotelRoomHotelIdReadDto,
      @Body() body: HotelRoomCreateDto,
  ): Promise<HotelRoomDto> {
    const { hotelId } = params;
    return this.hotelRoomService.createHotelRoom({ hotelId, ...body });
  }

  @Get()
  public getHotelRooms(
    @Param() params: HotelIdReadDto,
      @Query() query: HotelRoomPageReadDto,
  ): Promise<HotelRoomPageDto> {
    const { hotelId } = params;
    return this.hotelRoomService.readHotelRoom(hotelId, query);
  }

  @Get(':roomId')
  public getHotelRoomById(@Param() params: HotelRoomIdsReadDto): Promise<HotelRoomDto> {
    return this.hotelRoomService.readHotelRoomById(params);
  }

  @Patch(':roomId')
  public patchHotelRoomById(
    @Param() params: HotelRoomIdsReadDto,
      @Body() body: HotelRoomUpdateDto,
  ): Promise<HotelRoomDto> {
    return this.hotelRoomService.updateHotelRoomById(params, body);
  }

  @Delete(':roomId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteHotelRoomById(@Param() params: HotelRoomIdsReadDto): Promise<void> {
    return this.hotelRoomService.deleteHotelRoomById(params);
  }

}
