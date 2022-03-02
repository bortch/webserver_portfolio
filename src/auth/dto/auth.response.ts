import { User } from '../../users/models/user.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => User, { nullable: true })
  user: User;
}
