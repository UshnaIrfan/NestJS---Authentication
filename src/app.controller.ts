import { Controller, Get,Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {AuthService} from "./modules/auth/auth.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

              ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}



