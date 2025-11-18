import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    const hashed = await bcrypt.hash(body.password, 10);
    return this.usersService.createUser({ ...body, password: hashed });
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    const otp = await this.authService.generateOtpForUser(user._id);
    console.log("OTP for login:", otp);
    return { message: 'OTP sent to your email/phone.' };
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: any) {
    return this.authService.verifyOtp(body.email, body.otp);
  }
}
