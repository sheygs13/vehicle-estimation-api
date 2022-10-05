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
  LoginUser,
  UpdateUser,
  QueryParams,
  User as UserDto,
} from './user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Serialize } from '../interceptors/serialize.interceptors';

@Controller('auth')
// expects a class dto
@Serialize(UserDto)
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signUp(@Body() body: CreateUser) {
    const newUser = this.authService.createAccount(body);

    return newUser;
  }

  @Post('signin')
  async signIn(@Body() body: LoginUser) {
    const user = await this.authService.signIn(body);

    return user;
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
