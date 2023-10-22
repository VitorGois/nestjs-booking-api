import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

import { Hotel } from '../hotel/hotel.entity';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';
import { BookingCreateDto, BookingPageReadDto, BookingUpdateDto } from './booking.dto.in';
import { BookingDto, BookingPageDto } from './booking.dto.out';
import { Booking } from './booking.entity';
import { BookingStatus } from './booking.enum';
import { BookingExistenceParams, BookingVerifyRoomCapacityParams } from './booking.interface';

@Injectable()
export class BookingService {

  public constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  /**
   * Converts a Booking entity to a BookingDto for data transfer.
   * @param booking - The Booking entity to be converted.
   * @returns The converted BookingDto.
   */
  private toDto(booking: Booking): BookingDto {
    return {
      id: booking.id,
      guests: booking.guests,
      checkInDate: booking.checkInDate,
      checkoutDate: booking.checkoutDate,
      status: booking.status,
      user: booking.user,
      hotel: booking.hotel,
      room: booking.room,
    };
  }

  /**
   * Creates a new booking with the provided parameters.
   * @param params - The parameters for creating the booking.
   * @throws {BadRequestException} If the checkInDate is after the checkoutDate.
   * @throws {NotFoundException} If the user, hotel or room with the provided ID is not found.
   * @throws {ConflictException} If the booking is not available.
   * @returns A promise that resolves to the created BookingDto.
   */
  public async createBooking(params: BookingCreateDto): Promise<BookingDto> {
    const { user, hotel, room, ...bookingParams } = params;

    const checkInDate = new Date(bookingParams.checkInDate);
    const checkoutDate = new Date(bookingParams.checkoutDate);

    if (checkInDate >= checkoutDate) {
      throw new BadRequestException('checkInDate must be before checkoutDate');
    }

    const [
      userEntity,
      roomEntity,
      hotelEntity,
    ] = await Promise.all([
      this.userRepository.findOneByOrFail({ id: user }),
      this.roomRepository.findOneByOrFail({ id: room, hotel: { id: hotel } }),
      this.hotelRepository.findOneByOrFail({ id: hotel }),
    ]);

    await this.verifyBookingAvailability({
      room: roomEntity,
      hotel: hotelEntity,
      checkInDate,
      checkoutDate,
      guests: bookingParams.guests,
    });

    const bookingEntity = this.bookingRepository.create({
      ...bookingParams,
      checkInDate,
      checkoutDate,
      user: userEntity,
      hotel: hotelEntity,
      room: roomEntity,
    });

    const booking = await this.bookingRepository.save(bookingEntity);

    return this.toDto(booking);
  }

  /**
   * Retrieves a page of bookings and returns it as a BookingPageDto.
   * @param params - The parameters for retrieving the page of bookings.
   * @returns A promise that resolves to the retrieved BookingPageDto.
   */
  public async readBooking(params: BookingPageReadDto): Promise<BookingPageDto> {
    const { hotel, room, user, status, ...pageAndSort } = params;
    const { page, perPage, sort, order, count } = pageAndSort;

    let query = this.bookingRepository
      .createQueryBuilder('booking');

    if (hotel) query = query.andWhere('hotel.id = :hotel', { hotel });
    if (room) query = query.andWhere('room.id = :room', { room });
    if (user) query = query.andWhere('user.id = :user', { user });
    if (status) query = query.andWhere('status = :status', { status });
    if (order && sort) query = query.orderBy(sort, order);

    const offset = (page - 1) * perPage;
    query = query.skip(offset).take(perPage);

    const data = await query.getMany();
    const total = await(count ? query.getCount() : undefined);

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
   * Retrieves a booking by its ID and returns it as a BookingDto.
   * @param id - The ID of the booking to be retrieved.
   * @throws {NotFoundException} If the booking with the provided ID is not found.
   * @returns A promise that resolves to the retrieved BookingDto.
   */
  public async readBookingById(id: string): Promise<BookingDto> {
    const booking = await this.bookingRepository.findOneByOrFail({ id });
    return this.toDto(booking);
  }

  /**
   * Updates a booking by its ID.
   * @param id - The ID of the booking to be updated.
   * @param params - The parameters for updating the booking.
   * @throws {NotFoundException} If the booking with the provided ID is not found.
   * @throws {BadRequestException} If the room capacity is not enough.
   * @returns A promise that resolves to the updated BookingDto.
   */
  public async updateBookingById(id: string, params: BookingUpdateDto): Promise<BookingDto> {
    const { guests, status } = params;

    const booking = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.room', 'room')
      .where('booking.id = :id', { id })
      .getOne();

    if (guests) {
      this.verifyRoomCapacity({ room: booking.room, guests });
      booking.guests = guests;
    }

    if (status) {
      booking.status = status;
    }

    const updatedBooking = await this.bookingRepository.save(booking);

    return this.toDto(updatedBooking);
  }

  /**
   * Deletes a booking by its ID.
   * @param id - The ID of the booking to be deleted.
   * @throws {NotFoundException} If the booking with the provided ID is not found.
   * @returns A promise that resolves to void.
   */
  public async deleteBookingById(id: string): Promise<void> {
    const booking = await this.bookingRepository.findOneByOrFail({ id });
    await this.bookingRepository.remove(booking);
  }

  /**
   * Given a set of parameters, verifies that the booking is available.
   * @param params - The parameters to be verified.
   * @throws {ConflictException} If the booking is not available.
   * @returns A promise that resolves to void.
   */
  private async verifyBookingAvailability(params: BookingExistenceParams): Promise<void> {
    const { room, hotel, checkoutDate, checkInDate, guests } = params;
    const { id: roomId } = room;

    const existingBooking = await this.bookingRepository.findOne({
      where: {
        hotel: { id: hotel.id },
        room: { id: roomId },
        checkInDate: LessThanOrEqual(checkoutDate),
        checkoutDate: MoreThanOrEqual(checkInDate),
      },
    });

    if (existingBooking && existingBooking.status !== BookingStatus.CANCELED) {
      throw new ConflictException('checkInDate and checkOutDate period has already been reserved');
    }

    this.verifyRoomCapacity({ room, guests });
  }

  /**
   * Given a room and the number of guests,
   * verifies that the room capacity is enough.
   * @param params - The parameters to be verified.
   * @throws {BadRequestException} If the room capacity is not enough.
   * @returns A promise that resolves to void.
   */
  public verifyRoomCapacity(params: BookingVerifyRoomCapacityParams): void {
    const { room, guests } = params;
    const { doubleBed, singleBed } = room;

    const roomCapacity = doubleBed * 2 + singleBed;

    if (roomCapacity < guests) {
      throw new BadRequestException(`guests must be less than or equal to room capacity (${roomCapacity})`);
    }
  }

}
