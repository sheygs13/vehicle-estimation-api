import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Patch,
  Query,
  Param,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateUser,
  UpdateUser,
  QueryParams,
  User as UserDto,
} from './user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptors';

@Controller('auth')
// expects a class dto
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  signUp(@Body() body: CreateUser) {
    const newUser = this.userService.createUser(body);

    return newUser;
  }

  @Get('users/:id')
  async findUser(@Param('id') id: string) {
    console.log('running handler...');
    const user = await this.userService.findOne(id);

    return user;
  }

  @Get('users')
  async findUsers(@Query() query: QueryParams) {
    const users = await this.userService.find(query.email);

    return users;
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await this.userService.removeOne(id);

    return user;
  }

  @Patch('users/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUser) {
    const updatedUser = await this.userService.update(id, body);

    return updatedUser;
  }
}
