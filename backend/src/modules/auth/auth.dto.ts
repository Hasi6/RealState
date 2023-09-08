import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(32)
  @MinLength(6)
  password: string;
}

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(32)
  @MinLength(6)
  password: string;
}
