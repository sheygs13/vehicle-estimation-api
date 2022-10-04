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
} from '@nestjs/common';
import { CreateUser, UpdateUser, QueryParams } from './user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  signUp(@Body() body: CreateUser) {
    const newUser = this.userService.createUser(body);

    return newUser;
  }

  @Get('users/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    delete user.password;

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
