import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrmException } from '../orm/orm.enum';
import { UserCreateDto, UserPageReadDto, UserUpdateDto } from './user.dto.in';
import { UserDto, UserPageDto } from './user.dto.out';
import { User } from './user.entity';

@Injectable()
export class UserService {

  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Converts a User entity to a UserDto object.
   *
   * @param user - The User entity to be converted.
   * @returns A UserDto object containing user information.
   */
  private toDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      birthdate: user.birthdate,
      tax_id: user.tax_id,
      phone: user.phone,
    };
  }

  /**
   * Creates a new user by saving the provided UserCreateDto parameters.
   *
   * @param params - The parameters for creating the user.
   * @returns A Promise that resolves to a UserDto object representing the created user.
   */
  public async createUser(params: UserCreateDto): Promise<UserDto> {
    const userEntity = this.userRepository.create(params);
    const user = await this.userRepository.save(userEntity);
    return this.toDto(user);
  }

  /**
   * Retrieves a user by their unique identifier.
   *
   * @param id - The unique identifier of the user to retrieve.
   * @returns A Promise that resolves to a UserDto object representing the retrieved user.
   * @throws {EntityNotFoundError} If no user is found with the specified ID.
   */
  public async readUserById(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOneByOrFail({ id });
    return this.toDto(user);
  }

  /**
   * Retrieves a list of users based on specified filter and pagination criteria.
   *
   * @param params - The parameters for filtering and paginating the user list.
   * @returns A Promise that resolves to a UserPageDto object representing
   * the retrieved user data and pagination details.
   *
   */
  public async readUser(params: UserPageReadDto): Promise<UserPageDto> {
    const { name, email, tax_id, birthdate, phone, ...pageAndSort } = params;
    const { page, perPage, sort, order, count } = pageAndSort;

    let query = this.userRepository.createQueryBuilder();

    if (name) query = query.andWhere('LOWER(name) ILIKE LOWER(:name)', { name: `%${name}%` });
    if (email) query = query.andWhere('LOWER(email) = LOWER(:email)', { email });
    if (tax_id) query = query.andWhere('tax_id = :tax_id', { tax_id });
    if (birthdate) query = query.andWhere('birthdate = :birthdate', { birthdate });
    if (phone) query = query.andWhere('phone = :phone', { phone });
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
   * Updates a user's information based on the provided parameters.
   *
   * @param id - The unique identifier of the user to update.
   * @param params - The parameters for updating the user's information.
   * @returns A Promise that resolves to a UserDto object representing the updated user.
   * @throws {BadRequestException} If the user with the specified ID is not found or if the update operation fails.
   *
   */
  public async updateUserById(id: string, params: UserUpdateDto): Promise<UserDto> {
    const response = await this.userRepository.update(id, params);

    if (!response.affected) {
      throw new BadRequestException(OrmException.ENTITY_NOT_FOUND);
    }

    const user = await this.userRepository.findOneBy({ id });
    return this.toDto(user);
  }

  /**
   * Deletes a user based on the provided unique identifier.
   *
   * @param id - The unique identifier of the user to delete.
   * @returns A Promise that resolves when the user is successfully deleted.
   * @throws {BadRequestException} If the user with the specified ID is not found or if the deletion operation fails.
   */
  public async deleteUserById(id: string): Promise<void> {
    const user = await this.userRepository.findOneByOrFail({ id });
    await this.userRepository.remove(user);
  }

}
