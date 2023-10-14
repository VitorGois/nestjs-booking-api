import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../address/address.entity';
import { HotelCreateDto, HotelPageReadDto, HotelUpdateDto } from './hotel.dto.in';
import { HotelDto, HotelPageDto } from './hotel.dto.out';
import { Hotel } from './hotel.entity';

@Injectable()
export class HotelService {

  public constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) { }

  /**
   * Converts a Hotel entity to a HotelDto for data transfer.
   *
   * @param hotel - The Hotel entity to be converted.
   * @returns The converted HotelDto.
   */
  private toDto(hotel: Hotel): HotelDto {
    return {
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      contact_phone: hotel.contact_phone,
      rating: hotel.rating,
    };
  }

  /**
   * Creates a new hotel with the provided parameters and associates it with an address.
   *
   * @param params - The parameters for creating the hotel, including address details.
   * @returns A promise that resolves to the created HotelDto.
   */
  public async createHotel(params: HotelCreateDto): Promise<HotelDto> {
    const { address: addressParams, ...hotelParams } = params;

    const addressEntity = this.addressRepository.create(addressParams);
    const address = await this.addressRepository.save(addressEntity);

    const hotelEntity = this.hotelRepository.create(hotelParams);
    const hotel = await this.hotelRepository.save({
      ...hotelEntity,
      address,
    });
    return this.toDto(hotel);
  }

  /**
   * Retrieves a list of hotels based on specified filters and pagination parameters and returns them as a HotelPageDto.
   *
   * @param params - Parameters for filtering and pagination.
   * @throws {InternalServerErrorException} If an error occurs during the retrieval process.
   * @returns A promise that resolves to the retrieved HotelPageDto.
   */
  public async readHotel(params: HotelPageReadDto): Promise<HotelPageDto> {
    const { name, contact_phone, rating, city, state, ...pageAndSort } = params;
    const { page, perPage, sort, order, count } = pageAndSort;

    let query = this.hotelRepository
      .createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.address', 'address');

    if (name) query = query.andWhere('LOWER(name) LIKE LOWER(:name)', { name: `%${name}%` });
    if (contact_phone) query = query.andWhere('contact_phone = :contact_phone', { contact_phone });
    if (rating) query = query.andWhere('rating = :rating', { rating });
    if (city) query = query.andWhere('LOWER(address.city) LIKE LOWER(:city)', { city: `%${city}%` });
    if (state) query = query.andWhere('LOWER(address.state) LIKE LOWER(:state)', { state: `%${state}%` });
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
   * Retrieves a hotel by its ID and returns it as a HotelDto.
   *
   * @param id - The ID of the hotel to be retrieved.
   * @throws {NotFoundException} If the hotel with the provided ID is not found.
   * @returns A promise that resolves to the retrieved HotelDto.
   */
  public async readHotelById(id: string): Promise<HotelDto> {
    const hotel = await this.hotelRepository.findOneByOrFail({ id });
    return this.toDto(hotel);
  }

  /**
   * Updates a hotel and its associated address by the provided ID and parameters.
   *
   * @param id - The ID of the hotel to be updated.
   * @param params - The parameters for updating the hotel, including address details.
   * @throws {NotFoundException} If the hotel with the provided ID is not found.
   * @throws {InternalServerErrorException} If an error occurs during the update process.
   * @returns A promise that resolves to the updated HotelDto.
   */
  public async updateHotelById(id: string, params: HotelUpdateDto): Promise<HotelDto> {
    const { address: addressParams, ...hotelParams } = params;

    const hotel = await this.hotelRepository.findOneByOrFail({ id });

    if (addressParams) {
      const address = hotel.address;

      const addressEntity = this.addressRepository.create({
        ...address,
        ...addressParams,
      });

      const updatedAddress = await this.addressRepository.save(addressEntity);

      hotel.address = updatedAddress;
    }

    const updatedHotel = await this.hotelRepository.save({
      ...hotel,
      ...hotelParams,
    });

    return this.toDto(updatedHotel);
  }

  /**
   * Deletes a hotel and its associated address by the provided ID.
   *
   * @param id - The ID of the hotel to be deleted.
   * @throws {NotFoundException} If the hotel with the provided ID is not found.
   * @throws {InternalServerErrorException} If an error occurs during the deletion process.
   * @returns A promise that resolves once the hotel and address are deleted.
   */
  public async deleteHotelById(id: string): Promise<void> {
    const hotel = await this.hotelRepository.findOneByOrFail({ id });
    await this.hotelRepository.remove(hotel);
    await this.addressRepository.remove(hotel.address);
    // TODO: remove hotel rooms
  }

}
