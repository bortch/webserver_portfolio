import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../users/dto/create.user.input';
import { AuthResponse } from './dto/auth.response';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => AuthResponse, { name: 'login', description: 'Login' })
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Mutation(() => AuthResponse)
  async register(
    @Args('user', { type: () => CreateUserInput }) user: CreateUserInput,
  ) {
    return this.authService.register(user);
  }
}
