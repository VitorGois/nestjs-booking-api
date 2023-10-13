import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {

  public constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  public create() {
    return this.userService.create();
  }

  @Get()
  public findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  public update(@Param('id') id: string) {
    return this.userService.update(+id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}
