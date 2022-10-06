import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Patch,
  Query,
  Param,
  Session,
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

  @Get('names/:name')
  setColor(@Param('name') name: string, @Session() session: any) {
    session.name = name;
  }

  @Get('names')
  getColors(@Session() session: any) {
    return session.name;
  }

  @Get('me')
  getCurrentUser(@Session() session: any) {
    return this.userService.findOne(session.userId);
  }

  @Post('signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('signup')
  async signUp(@Body() body: CreateUser, @Session() session: any) {
    const user = await this.authService.createAccount(body);

    session.userId = user.id;

    return user;
  }

  @Post('signin')
  async signIn(@Body() body: LoginUser, @Session() session: any) {
    const user = await this.authService.signIn(body);

    session.userId = user.id;

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
