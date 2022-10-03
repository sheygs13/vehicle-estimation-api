import { Controller, Post, Body } from '@nestjs/common';
import { CreateUser } from './user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  signUp(@Body() body: CreateUser) {
    const newUser = this.userService.createUser(body);
    return newUser;
  }
}
