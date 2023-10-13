import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';

import { UserCreateDto, UserIdReadDto, UserPageReadDto, UserUpdateDto } from './user.dto.in';
import { UserDto, UserPageDto } from './user.dto.out';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  public constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  public postUser(@Body() body: UserCreateDto): Promise<UserDto> {
    return this.userService.createUser(body);
  }

  @Get()
  public getUser(@Query() query: UserPageReadDto): Promise<UserPageDto> {
    return this.userService.readUser(query);
  }

  @Get(':id')
  public getUserById(@Param() params: UserIdReadDto): Promise<UserDto> {
    return this.userService.readUserById(params.id);
  }

  @Patch(':id')
  public patchUserById(@Param() params: UserIdReadDto, @Body() body: UserUpdateDto): Promise<UserDto> {
    return this.userService.updateUserById(params.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public deleteUserById(@Param() params: UserIdReadDto): Promise<void> {
    return this.userService.deleteUserById(params.id);
  }

}
