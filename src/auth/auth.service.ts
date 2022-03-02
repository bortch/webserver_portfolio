// retrieve a user and verify password

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserModel } from '../users/models/user.model';
import { CreateUserInput } from '../users/dto/create.user.input';
import { AuthResponse } from '../auth/dto/auth.response';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  public async validateUser(email: string, pass: string): Promise<UserModel> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const hashed = await bcrypt.hash(pass, user.salt);
      if (user.password === hashed) {
        user.password = '';
        user.salt = '';
        return user;
      }
    }
    return null;
  }

  private async registrationValidation(
    createUserInput: CreateUserInput,
  ): Promise<string> {
    if (!createUserInput.email) {
      return "Email can't be empty";
    }

    const emailRule =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRule.test(createUserInput.email.toLowerCase())) {
      return 'Invalid email';
    }

    const user = await this.usersService.findOneByEmail(createUserInput.email);
    if (user != null && user.email) {
      return 'Email already exist';
    }
  }

  private async getPasswordHash(
    password: string,
    salt: string,
  ): Promise<string> {
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private getToken(user: UserModel): string {
    const expiresIn = this.configService.get<number>('JWT_EXPIRES_IN');
    const secret = this.configService.get<string>('JWT_SECRET');
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      secret,
      { expiresIn },
    );
    return accessToken;
  }

  public async register(
    createUserInput: CreateUserInput,
  ): Promise<AuthResponse> {
    const result = new AuthResponse();
    // validate registration
    const validationResult = await this.registrationValidation(createUserInput);
    if (validationResult) {
      result.success = false;
      result.message = validationResult;
      return result;
    }
    // else input is valid
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await this.getPasswordHash(
      createUserInput.password,
      salt,
    );

    createUserInput.password = passwordHash;
    createUserInput.salt = salt;

    const createdUser = await this.usersService.create(createUserInput);
    result.success = true;
    result.message = `User ${createdUser.username} created`;
    // generate token
    createdUser.accessToken = this.getToken(createdUser);
    // filter sensitive data
    createdUser.password = '';
    createdUser.salt = '';
    result.user = createdUser;

    return result;
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    const result = new AuthResponse();
    const user = await this.validateUser(email, password);
    if (user) {
      user.accessToken = this.getToken(user);
      result.success = true;
      result.message = 'User logged in';
      result.user = user;
    } else {
      result.success = false;
      result.message = 'Invalid credentials';
    }
    console.log(result);
    return result;
  }
}
