import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUser } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}
  async createUser(body: CreateUser) {
    const { email, password } = body;
    const user = this.repository.create({ email, password });
    await this.repository.save(user);
    return user;
  }
}
