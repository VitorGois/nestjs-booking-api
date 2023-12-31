import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HotelIdReadDto } from '../hotel/hotel.dto.in';
import { RoomCreateDto, RoomIdsReadDto, RoomPageReadDto, RoomUpdateDto } from './room.dto.in';
import { RoomDto, RoomPageDto } from './room.dto.out';
import { RoomService } from './room.service';

@ApiTags('rooms')
@Controller('hotels/:hotelId/rooms')
export class RoomController {

  public constructor(
    private readonly hotelRoomService: RoomService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new room.', description: 'Create a new room associating to the specified hotel.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: RoomDto, description: 'Room created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid room data.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Room already exists.' })
  public postHotelRoom(@Param() params: HotelIdReadDto, @Body() body: RoomCreateDto): Promise<RoomDto> {
    const { hotelId } = params;
    return this.hotelRoomService.createRoom({ hotelId, ...body });
  }

  @Get()
  @ApiOperation({ summary: 'Read rooms.', description: 'Read rooms by pagination for specific hotel.' })
  @ApiResponse({ status: HttpStatus.OK, type: RoomPageDto, description: 'Room list.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid filter params.' })
  public getHotelRooms(@Param() params: HotelIdReadDto, @Query() query: RoomPageReadDto): Promise<RoomPageDto> {
    const { hotelId } = params;
    return this.hotelRoomService.readRoom(hotelId, query);
  }

  @Get(':roomId')
  @ApiOperation({ summary: 'Read room.', description: 'Read room by id for specific hotel.' })
  @ApiResponse({ status: HttpStatus.OK, type: RoomDto, description: 'Room found.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Room not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid room ID.' })
  public getHotelRoomById(@Param() params: RoomIdsReadDto): Promise<RoomDto> {
    return this.hotelRoomService.readRoomById(params);
  }

  @Patch(':roomId')
  @ApiOperation({ summary: 'Update room.', description: 'Update room by id for specific hotel.' })
  @ApiResponse({ status: HttpStatus.OK, type: RoomDto, description: 'Room updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Room not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid room ID or data.' })
  public patchHotelRoomById(@Param() params: RoomIdsReadDto, @Body() body: RoomUpdateDto): Promise<RoomDto> {
    return this.hotelRoomService.updateRoomById(params, body);
  }

  @Delete(':roomId')
  @ApiOperation({ summary: 'Delete room.', description: 'Delete room by id for specific hotel.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Room deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Room not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid room ID.' })
  public deleteHotelRoomById(@Param() params: RoomIdsReadDto): Promise<void> {
    return this.hotelRoomService.deleteRoomById(params);
  }

}
