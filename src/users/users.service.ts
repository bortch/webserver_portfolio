import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { User, UserModel } from './models/user.model';
import { CreateUserInput } from './dto/create.user.input';
import { UpdateUserInput } from './dto/update.user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserModel>,
  ) {}

  async create(
    createUserInput: CreateUserInput,
  ): Promise<UserModel | undefined> {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  async findOneById(
    id: MongooseSchema.Types.ObjectId,
  ): Promise<UserModel | undefined> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneByUsername(username: string): Promise<UserModel | undefined> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findOneByEmail(email: string): Promise<UserModel | undefined> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async update(
    id: MongooseSchema.Types.ObjectId,
    updateUserInput: UpdateUserInput,
  ): Promise<any> {
    return this.userModel.updateOne({ _id: id }, updateUserInput).exec();
  }

  async remove(id: MongooseSchema.Types.ObjectId): Promise<any> {
    return this.userModel.deleteOne({ _id: id }).exec();
  }
}
