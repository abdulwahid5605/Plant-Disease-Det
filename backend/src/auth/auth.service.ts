import { Injectable, UnauthorizedException, BadRequestException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async generateOtpForUser(userId: string) {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min validity
    await this.usersService.updateUser(userId, { otp, otpExpiresAt: expiresAt });
    return otp;
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');
    if (user.otp !== otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    await this.usersService.updateUser(user._id.toString(), { otp: null, otpExpiresAt: null });
    const payload = { email: user.email, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
