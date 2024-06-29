import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  async private(@GetUser() user: User) {
    return {
      user,
    };
  }

  @Post('register')
  register(@Body() user: RegisterUserDto) {
    return this.authService.register(user);
  }

  @Get('renew-token')
  @UseGuards(AuthGuard())
  async renewToken(@GetUser() user: User) {
    return this.authService.renewToken(user);
  }
}
