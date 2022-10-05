import { Injectable, Post, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser, LoginUser } from './user.dto';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createAccount(body: CreateUser) {
    const { email, password } = body;
    // check if email exists
    const users = await this.usersService.find(email);

    if (users.length)
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);

    // validate & encrypt user password

    //1. generate salt
    const salt = randomBytes(8).toString('hex');

    //2. hash the user password and salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //3. join the hashed result & generated salt
    const hashedPassword = `${hash.toString('hex')}.${salt}`;

    // create new user and save it
    const userAccount = await this.usersService.createUser({
      email,
      password: hashedPassword,
    });

    return userAccount;
  }

  @Post()
  async signIn(body: LoginUser) {
    const { email, password } = body;

    // check if email exist
    // if it does not exist, throw error
    const [user] = await this.usersService.find(email);

    if (!user)
      throw new HttpException(
        'Invalid email. User does not exist',
        HttpStatus.BAD_REQUEST,
      );

    // get the saved (hashed) password
    const actualPassword = user.password;

    // split the salt and hash from the saved password
    const [storedHash, salt] = actualPassword.split('.');

    //2. hash the request password with the saved salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // get a string representation of the hash
    const generatedHash = hash.toString('hex');

    // compare the generatedhash & storedHash
    const result = generatedHash.localeCompare(storedHash);

    // if it is zero, valid password
    if (result !== 0) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
