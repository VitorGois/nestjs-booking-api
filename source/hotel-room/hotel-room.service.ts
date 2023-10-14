import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Hotel } from '../hotel/hotel.entity';
import { Room } from '../room/room.entity';
import { HotelRoomIdsReadDto, HotelRoomPageReadDto, HotelRoomUpdateDto } from './hotel-room.dto.in';
import { HotelRoomDto, HotelRoomPageDto } from './hotel-room.dto.out';
import { HotelRoomCreateParams } from './hotel-room.interface';

@Injectable()
export class HotelRoomService {

  public constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) { }

  /**
   *
   * @param hotelRoom
   */
  private toDto(hotelRoom: Room): HotelRoomDto {
    return {
      id: hotelRoom.id,
      number: hotelRoom.number,
      single_bed: hotelRoom.single_bed,
      double_bed: hotelRoom.double_bed,
      price: hotelRoom.price,
      assigned: hotelRoom.assigned,
    };
  }

  /**
   *
   * @param params
   */
  public async createHotelRoom(params: HotelRoomCreateParams): Promise<HotelRoomDto> {
    const { hotelId, ...roomParams } = params;

    const hotel = await this.hotelRepository.findOneByOrFail({ id: hotelId });

    const roomEntity = this.roomRepository.create(roomParams);
    const room = await this.roomRepository.save({
      ...roomEntity,
      hotel,
    });

    return this.toDto(room);
  }

  /**
   *
   * @param hotelId
   * @param params
   */
  public async readHotelRoom(hotelId: string, params: HotelRoomPageReadDto): Promise<HotelRoomPageDto> {
    const { single_bed, double_bed, min_price, max_price, ...pageAndSort } = params;
    const { page, perPage, sort, order, count } = pageAndSort;

    let query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.hotel', 'hotel')
      .where('hotel.id = :hotelId', { hotelId });

    if (single_bed) query = query.andWhere('room.single_bed = :single_bed', { single_bed });
    if (double_bed) query = query.andWhere('room.double_bed = :double_bed', { double_bed });
    if (min_price) query = query.andWhere('room.price >= :min_price', { min_price });
    if (max_price) query = query.andWhere('room.price <= :max_price', { max_price });
    if (order && sort) query = query.orderBy(sort, order);

    const offset = (page - 1) * perPage;
    query = query.skip(offset).take(perPage);

    const data = await query.getMany();
    const total = await (count ? query.getCount() : undefined);

    return {
      page,
      perPage,
      count: total,
      order,
      sort,
      records: data.map((d) => this.toDto(d)),
    };
  }

  /**
   *
   * @param id
   * @param params
   */
  public async readHotelRoomById(params: HotelRoomIdsReadDto): Promise<HotelRoomDto> {
    const { hotelId, roomId } = params;

    const room = await this.roomRepository.findOneByOrFail({
      id: roomId,
      hotel: { id: hotelId },
    });

    return this.toDto(room);
  }

  /**
   *
   * @param params
   * @param body
   */
  public async updateHotelRoomById(
    params: HotelRoomIdsReadDto,
    body: HotelRoomUpdateDto,
  ): Promise<HotelRoomDto> {
    const { hotelId, roomId } = params;

    const room = await this.roomRepository.findOneByOrFail({
      id: roomId,
      hotel: { id: hotelId },
    });

    const updatedRoom = await this.roomRepository.save({
      ...room,
      ...body,
    });

    return this.toDto(updatedRoom);
  }

  /**
   *
   * @param params
   */
  public async deleteHotelRoomById(params: HotelRoomIdsReadDto): Promise<void> {
    const { hotelId, roomId } = params;

    const room = await this.roomRepository.findOneByOrFail({
      id: roomId,
      hotel: { id: hotelId },
    });

    await this.roomRepository.remove(room);
  }

}
