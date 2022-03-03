import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, ConfigModule.forRoot()],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
