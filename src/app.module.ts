import { Module } from '@nestjs/common';
import { ConfigModule ,ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import UsersModule from "./modules/users/users.module";
import {AuthService} from "./modules/auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalAuthGuard } from "./modules/auth/guards/local-auth.guards";
import {JwtAuthGuard} from "./modules/auth/guards/jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "./modules/auth/strategies/jwt.strategy";

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal: true,
      envFilePath:['.env'],
    }),
      MongooseModule.forRootAsync({
      imports: [ConfigModule],
       useFactory: (configService: ConfigService) => ({
        uri: process.env.MONGO_URI,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PassportModule
  ],
  controllers: [AppController],
  providers: [AppService ,JwtService,AuthService ,JwtStrategy,LocalAuthGuard,JwtAuthGuard],
})
export class AppModule {}
