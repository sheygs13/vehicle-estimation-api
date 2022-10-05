import { IsEmail, IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUser {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

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
