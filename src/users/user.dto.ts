import { IsEmail, IsString, IsOptional } from 'class-validator';

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
