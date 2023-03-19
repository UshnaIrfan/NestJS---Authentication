import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from "@nestjs/passport";
import UsersModule from "../users/users.module";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersService} from "../users/users.service";
import { UsersRepository } from "../users/users.repository";
import {LocalAuthGuard} from "./guards/local-auth.guards";
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {JwtStrategy} from "./strategies/jwt.strategy";
import { jwtConstants } from './constants/constants';
require("dotenv").config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions: { expiresIn: '3600s' }
    })
],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard,JwtStrategy ,LocalAuthGuard,UsersService, UsersRepository]
})
export class AuthModule {}
