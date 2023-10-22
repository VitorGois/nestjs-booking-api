import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OrmUuidReadDto } from '../orm/orm.dto.in';
import { HotelCreateDto, HotelPageReadDto, HotelUpdateDto } from './hotel.dto.in';
import { HotelDto, HotelPageDto } from './hotel.dto.out';
import { HotelService } from './hotel.service';

@ApiTags('hotels')
@Controller('hotels')
export class HotelController {

  public constructor(
    private readonly hotelService: HotelService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create hotel.', description: 'Create hotel.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: HotelDto, description: 'Hotel created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid hotel data.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Hotel already exists.' })
  public postHotel(@Body() body: HotelCreateDto): Promise<HotelDto> {
    return this.hotelService.createHotel(body);
  }

  @Get()
  @ApiOperation({ summary: 'Read hotels.', description: 'Read hotels by pagination.' })
  @ApiResponse({ status: HttpStatus.OK, type: HotelPageDto, description: 'Hotel list.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid filter params.' })
  public getHotel(@Query() query: HotelPageReadDto): Promise<HotelPageDto> {
    return this.hotelService.readHotel(query);
  }

  @Get('deleted')
  @ApiOperation({ summary: 'Read soft deleted hotels.', description: 'Read soft deleted hotels by pagination.' })
  @ApiResponse({ status: HttpStatus.OK, type: HotelPageDto, description: 'Soft deleted hotel list.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid filter params.' })
  public getSoftDeletedHotel(@Query() query: HotelPageReadDto): Promise<HotelPageDto> {
    return this.hotelService.readSoftDeletedHotel(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read hotel.', description: 'Read hotel by id.' })
  @ApiResponse({ status: HttpStatus.OK, type: HotelDto, description: 'Hotel found.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Hotel not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid hotel ID.' })
  public getHotelById(@Param() params: OrmUuidReadDto): Promise<HotelDto> {
    return this.hotelService.readHotelById(params.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update hotel.', description: 'Update hotel by id.' })
  @ApiResponse({ status: HttpStatus.OK, type: HotelDto, description: 'Hotel updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Hotel not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid hotel ID or data.' })
  public patchHotelById(@Param() params: OrmUuidReadDto, @Body() body: HotelUpdateDto): Promise<HotelDto> {
    return this.hotelService.updateHotelById(params.id, body);
  }

  @Put(':id/restore')
  @ApiOperation({ summary: 'Restore soft deleted hotel.', description: 'Restore soft deleted hotel by id.' })
  @ApiResponse({ status: HttpStatus.OK, type: HotelDto, description: 'Hotel restored.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Hotel not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid hotel ID.' })
  public restoreSoftDeletedHotelById(@Param() params: OrmUuidReadDto): Promise<HotelDto> {
    return this.hotelService.restoreSoftDeletedHotelById(params.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete hotel.', description: 'Delete hotel by id, perform a soft delete.' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Hotel deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Hotel not found.' })
  public deleteHotelById(@Param() params: OrmUuidReadDto): Promise<void> {
    return this.hotelService.deleteHotelById(params.id);
  }

}
