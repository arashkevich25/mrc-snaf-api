import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Common function to validate user
  async validateUser(email: string, pass: string): Promise<any> {
    // ** Info
    // In real product, should be used descrypt password from DB and compare to pass arg

    const user = await this.userService.findByEmail(email);
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }

  // Login
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Create a new user
  async register(createUserDto: CreateUserDto) {
    // ** Info
    // In production should be used encrypt

    const user = await this.userService.add(createUserDto);
    console.log('Log after create user, according to requirements', user);
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
