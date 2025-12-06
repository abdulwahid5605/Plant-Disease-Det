import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });
  }
  
  async validateUser(email: string, pass: string): Promise<any> {
    console.log("------------",process.env.SENDER_EMAIL);
    console.log("------------",process.env.SENDER_EMAIL_PASSWORD);
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async generateOtpForUser(userId: string) {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 
    await this.usersService.updateUser(userId, {
      otp,
      otpExpiresAt: expiresAt,
    });
    return otp;
  }
  async sendOtpEmail(to: string, otp: string) {
    await this.transporter.sendMail({
      from:`"Your App" <${process.env.SENDER_EMAIL}>`,
      to,
      subject: 'Your OTP Code',
      html: `
        <h2>Your OTP Code</h2>
        <p>Use the following OTP to login:</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
      `,
    });
  }
  async verifyOtp(email: string, otp: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('User not found');
    if (
      user.otp !== otp ||
      !user.otpExpiresAt ||
      user.otpExpiresAt < new Date()
    ) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    await this.usersService.updateUser(user._id.toString(), {
      otp: null,
      otpExpiresAt: null,
    });
    const payload = { email: user.email, sub: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
