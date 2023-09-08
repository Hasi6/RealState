import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from '@/modules/auth/auth.service';
import { LoginDTO, RegisterDTO } from '@/modules/auth/auth.dto';
import { successResponseBuilder } from '@/utils/responseBuilder';
import { AuthGuard } from '@/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() body: RegisterDTO) {
    const data = await this.authService.register(body);
    return successResponseBuilder(data);
  }

  @Post('/login')
  public async login(@Body() body: LoginDTO) {
    const data = await this.authService.login(body);
    return successResponseBuilder(data);
  }

  @UseGuards(AuthGuard)
  @Get('/whoAmI')
  public async whoAmI(@Req() req) {
    return successResponseBuilder(req.user);
  }
}
