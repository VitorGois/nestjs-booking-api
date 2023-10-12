import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {

  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   *
   */
  create() {
    return 'This action adds a new user';
  }

  /**
   *
   */
  findAll() {
    return `This action returns all user`;
  }

  /**
   *
   * @param id
   */
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  /**
   *
   * @param id
   */
  update(id: number) {
    return `This action updates a #${id} user`;
  }

  /**
   *
   * @param id
   */
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
