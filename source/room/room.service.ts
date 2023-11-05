import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Hotel } from '../hotel/hotel.entity';
import { RoomIdsReadDto, RoomPageReadDto, RoomUpdateDto } from './room.dto.in';
import { RoomDto, RoomPageDto } from './room.dto.out';
import { Room } from './room.entity';
import { RoomCreateParams } from './room.interface';

@Injectable()
export class RoomService {

  public constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) { }

  /**
   * Convert entity to DTO.
   * @param hotelRoom Hotel room entity.
   * @returns Hotel room DTO.
   */
  private toDto(hotelRoom: Room): RoomDto {
    return {
      id: hotelRoom.id,
      number: hotelRoom.number,
      singleBed: hotelRoom.singleBed,
      doubleBed: hotelRoom.doubleBed,
      price: hotelRoom.price,
    };
  }

  /**
   * Create hotel room.
   * @param params Hotel room create params.
   * @returns Hotel room DTO.
   * @throws {EntityNotFoundError} If hotel not found.
   * @throws {EntityNotFoundError} If hotel room not found.
   */
  public async createRoom(params: RoomCreateParams): Promise<RoomDto> {
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
   * Read hotel rooms.
   * @param hotelId Hotel ID.
   * @param params Hotel room page read params.
   * @returns Hotel room page DTO.
   * @throws {EntityNotFoundError} If hotel not found.
   * @throws {EntityNotFoundError} If hotel room not found.
   */
  public async readRoom(hotelId: string, params: RoomPageReadDto): Promise<RoomPageDto> {
    const { singleBed, doubleBed, minPrice, maxPrice, ...pageAndSort } = params;
    const { page, perPage, sort, order, count } = pageAndSort;

    let query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.hotel', 'hotel')
      .where('hotel.id = :hotelId', { hotelId });

    if (singleBed) query = query.andWhere('room.single_bed = :singleBed', { singleBed });
    if (doubleBed) query = query.andWhere('room.double_bed = :doubleBed', { doubleBed });
    if (minPrice) query = query.andWhere('room.price >= :minPrice', { minPrice });
    if (maxPrice) query = query.andWhere('room.price <= :maxPrice', { maxPrice });
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
   * Read hotel room by ID.
   * @param params Hotel room page read params.
   * @returns Hotel room DTO.
   * @throws {EntityNotFoundError} If hotel not found.
   * @throws {EntityNotFoundError} If hotel room not found.
   */
  public async readRoomById(params: RoomIdsReadDto): Promise<RoomDto> {
    const { hotelId, roomId } = params;

    const room = await this.roomRepository.findOneByOrFail({
      id: roomId,
      hotel: { id: hotelId },
    });

    return this.toDto(room);
  }

  /**
   * Update hotel room by ID.
   * @param params Hotel room page read params.
   * @param body Hotel room update params.
   * @returns Hotel room DTO.
   * @throws {EntityNotFoundError} If hotel not found.
   * @throws {EntityNotFoundError} If hotel room not found.
   */
  public async updateRoomById(params: RoomIdsReadDto, body: RoomUpdateDto): Promise<RoomDto> {
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
   * Delete hotel room by ID.
   * @param params Hotel room page read params.
   * @returns Void.
   * @throws {EntityNotFoundError} If hotel not found.
   */
  public async deleteRoomById(params: RoomIdsReadDto): Promise<void> {
    const { hotelId, roomId } = params;

    const room = await this.roomRepository.findOneByOrFail({
      id: roomId,
      hotel: { id: hotelId },
    });

    await this.roomRepository.remove(room);
  }

}
