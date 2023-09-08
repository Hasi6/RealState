import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDTO, RegisterDTO } from '@/modules/auth/auth.dto';
import { UserService } from '@/modules/user/user.service';
import { compareHash } from '@/utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async login(body: LoginDTO) {
    const user = await this.userService.findOne({ email: body.email });

    const errorMessages = [
      {
        field: 'email',
        message: 'Invalid credentials'
      },
      {
        field: 'password',
        message: 'Invalid credentials'
      }
    ];

    if (!user) {
      throw new UnauthorizedException(errorMessages);
    }

    const { password, ...rest } = user;

    const hasMatched = await compareHash(body.password, password);

    if (!hasMatched) {
      throw new UnauthorizedException(errorMessages);
    }

    return {
      access_token: await this.jwtService.signAsync(rest)
    };
  }

  public async register(body: RegisterDTO) {
    const errorMessages = [
      {
        field: 'email',
        message: 'Email Already Taken'
      }
    ];

    const user = await this.userService.findOne({ email: body.email });

    if (user) {
      throw new UnauthorizedException(errorMessages);
    }

    await this.userService.create({
      email: body.email,
      password: body.password
    });

    return {
      success: true
    };
  }
}
