import { IsEmail, IsString, IsOptional, Length } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUser {
  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 20)
  password: string;
}

export class LoginUser extends CreateUser {}

export class UpdateUser {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}

export class QueryParams {
  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;
}

export class User {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
