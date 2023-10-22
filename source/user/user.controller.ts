import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { OrmUuidReadDto } from '../orm/orm.dto.in';
import { UserCreateDto, UserPageReadDto, UserUpdateDto } from './user.dto.in';
import { UserDto, UserPageDto } from './user.dto.out';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {

  public constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user.', description: 'Create user.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDto, description: 'User created.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid user data.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists.' })
  public postUser(@Body() body: UserCreateDto): Promise<UserDto> {
    return this.userService.createUser(body);
  }

  @Get()
  @ApiOperation({ summary: 'Read users.', description: 'Read users by pagination.' })
  @ApiResponse({ status: HttpStatus.OK, type: UserPageDto, description: 'User list.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid filter params.' })
  public getUser(@Query() query: UserPageReadDto): Promise<UserPageDto> {
    return this.userService.readUser(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Read user.', description: 'Read user by id.' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto, description: 'User found.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid user ID.' })
  public getUserById(@Param() params: OrmUuidReadDto): Promise<UserDto> {
    return this.userService.readUserById(params.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user.', description: 'Update user by id.' })
  @ApiResponse({ status: HttpStatus.OK, type: UserDto, description: 'User updated.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid user ID or data.' })
  public patchUserById(@Param() params: OrmUuidReadDto, @Body() body: UserUpdateDto): Promise<UserDto> {
    return this.userService.updateUserById(params.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user.', description: 'Delete user by id.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'User deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid user ID.' })
  public deleteUserById(@Param() params: OrmUuidReadDto): Promise<void> {
    return this.userService.deleteUserById(params.id);
  }

}
