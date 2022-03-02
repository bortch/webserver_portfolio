import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update.user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', description: 'Get user by username' })
  async getUserByUsername(
    @Args('username', { type: () => String }) username: string,
  ) {
    return this.usersService.findOneByUsername(username);
  }

  @Query(() => User, { name: 'user_by_id', description: 'Get user by id' })
  async getUserById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(
    @Args('id', { type: () => Int }) id: MongooseSchema.Types.ObjectId,
  ) {
    return this.usersService.remove(id);
  }
}
