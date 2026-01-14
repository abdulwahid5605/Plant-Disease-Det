import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  @Post('register')
  async register(@Body() body: any) {
    const hashed = await bcrypt.hash(body.password, 10);
    return this.usersService.createUser({ ...body, password: hashed });
  }

@Post('login')
async login(@Body() body: any) {
  if (!body.email || !body.password) {
    throw new BadRequestException('Email and password required');
  }

  const user = await this.authService.validateUser(body.email, body.password);
  const otp = await this.authService.generateOtpForUser(user._id);
  console.log('LOGIN OTP:', otp);

  await this.authService.sendOtpEmail(user.email, otp);

  return { message: 'OTP sent to your email.' };
}

  @Post('logout')
  async logout() {
    return {
      message: 'Logged out successfully',
    };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: any) {
    return this.authService.verifyOtp(body.email, body.otp);
  }
}
