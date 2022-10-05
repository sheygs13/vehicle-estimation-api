import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findOne(id: string) {
    const user = await this.repository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async find(email: string) {
    const users = await this.repository.find({ where: { email } });

    return users;
  }

  async update(id: string, body: Partial<User>) {
    // find the id
    let user = await this.findOne(id);

    user = { ...user, ...body, updated_at: Date.now() } as unknown as User;

    await this.repository.save(user);

    return user;
  }

  async removeOne(id: string) {
    // find the id
    const user = await this.findOne(id);

    await this.repository.remove(user);
  }
}
