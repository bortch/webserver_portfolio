// User model will be used to generate the mongoose schema.

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User {
  @Field(() => String, { description: 'The user id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { description: 'The user password', nullable: false })
  @Prop({ required: true })
  password: string;

  @Field(() => String, { description: 'The user email', nullable: false })
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => String, { description: 'The user language', nullable: false })
  @Prop()
  language: string;

  @Field(() => String)
  @Prop({ required: true })
  salt: string;

  @Field(() => String, { description: 'The user username', nullable: false })
  @Prop({ required: true })
  username: string;

  @Field(() => Date)
  @Prop()
  accessTokenExpiresAt: Date;

  @Field(() => String, { description: 'The user access token', nullable: true })
  @Prop()
  accessToken: string;
}

export type UserModel = Document & User;

export const UserSchema = SchemaFactory.createForClass(User);
