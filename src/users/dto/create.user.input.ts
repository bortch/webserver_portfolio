import { InputType, Field } from '@nestjs/graphql';
import { AllowedLanguage } from './language.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => AllowedLanguage, { nullable: true })
  language?: AllowedLanguage;

  @Field(() => String, { nullable: true })
  salt?: string;
}
