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
import { BookingExistenceParams } from './booking.interface';

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
   *
   * @param booking
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
   *
   * @param params
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
   *
   * @param params
   */
  private async verifyBookingAvailability(params: BookingExistenceParams): Promise<void> {
    const { room, hotel, checkoutDate, checkInDate, guests } = params;
    const { id: roomId, doubleBed, singleBed } = room;

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

    const roomCapacity = doubleBed * 2 + singleBed;

    if (roomCapacity < guests) {
      throw new BadRequestException(`guests must be less than or equal to room capacity (${roomCapacity})`);
    }
  }

  /**
   *
   * @param params
   */
  public readBooking(params: BookingPageReadDto): Promise<BookingPageDto> {
    return Promise.resolve({ } as BookingPageDto);
  }

  /**
   *
   * @param id
   */
  public async readBookingById(id: string): Promise<BookingDto> {
    const booking = await this.bookingRepository.findOneByOrFail({ id });
    console.log(booking);
    return this.toDto(booking);
  }

  /**
   *
   * @param id
   * @param params
   */
  public async updateBookingById(id: string, params: BookingUpdateDto): Promise<BookingDto> {
    return;
  }

  /**
   *
   * @param id
   */
  public deleteBookingById(id: string): Promise<void> {
    return Promise.resolve();
  }

}
