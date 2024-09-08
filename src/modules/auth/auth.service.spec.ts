import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.model';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            findOne: jest.fn(),
            add: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user data if email and password are valid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        password: 'password123',
      };
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(mockUser as any);

      const result = await authService.validateUser(
        'test@test.com',
        'password123',
      );

      expect(result).toEqual({ id: 1, email: 'test@test.com' });
    });

    it('should return null if email or password is invalid', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

      const result = await authService.validateUser(
        'invalid@test.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token for valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        password: 'password123',
      };
      const loginDto: LoginDto = {
        email: 'test@test.com',
        password: 'password123',
      };
      const mockToken = 'jwt-token';

      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

      const result = await authService.login(loginDto);

      expect(result).toEqual({ access_token: mockToken });
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginDto: LoginDto = {
        email: 'test@test.com',
        password: 'wrongpassword',
      };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should return access token after successful registration', async () => {
      const createUserDto: CreateUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        password: 'password123',
      };
      const mockUser = { id: 1, email: 'john.doe@test.com' };
      const mockToken = 'jwt-token';

      jest.spyOn(userService, 'add').mockResolvedValue(mockUser as User);
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

      const result = await authService.register(createUserDto);

      expect(userService.add).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual({ access_token: mockToken });
    });
  });
});
