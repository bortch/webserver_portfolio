import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User, UserSchema } from './models/user.model';
import { AuthService } from 'src/auth/auth.service';

@Module({
  providers: [UsersResolver, UsersService, AuthService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({ envFilePath: ['.env.development.local'] }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
