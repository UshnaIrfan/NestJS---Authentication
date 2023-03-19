import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Delete,
  Request,
  UseGuards,
  Put
} from "@nestjs/common";
import { AuthService } from './auth.service';
import {SignupUserDto} from "./dto/signup-user.dto";
import {LoginUserDto} from "./dto/login-user.dto"
import {ForgotPasswordDto} from "./dto/forget-password-user.dto"
import {deleteDataDto} from "./dto/delete-user.dto"
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import {blogDto} from "./dto/createBlog.dto"
import {deleteBlogDto } from "./dto/deleteBlog.dto"
import {updateBlogDto} from "./dto/updateBlog.dto"

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

 // Profile Get
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // sign up
  @Post('/signup')
  async signup(@Body() signUpUserDto: SignupUserDto) {
    return this.authService.signup(signUpUserDto);
  }

  //login
  @ApiBody({ type: LoginUserDto })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //forgetPassword
  @Put('/forgotPassword')
  async forgotPassword(
    @Body() reqBody: ForgotPasswordDto): Promise<any> {
    return this.authService.forgotPassword(reqBody);
  }

  //deleteUser
  @Delete('/deleteUser')
  async deleteUser(
    @Body() reqBody: deleteDataDto): Promise<any> {
    return this.authService.deleteUser(reqBody);
  }

 //Create Blog
  @Post('/createBlog')
  async Blog(@Body() BlogDto: blogDto) {
    return this.authService.blog(BlogDto);
  }

  //Get Blog
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/getBlog')
  getBlog(@Request() req) {
    return this.authService.blogGet(req.user.id);
  }


  //update Blog
  @Patch('/updateBLog')
  updateBlog( @Body() reqBody:updateBlogDto) :Promise<any> {
    return this.authService.blogUpdate(reqBody);
  }

  //delete Blog
  @Delete('/deleteBlog')
  async deleteBlog(
    @Body() reqBody: deleteBlogDto): Promise<any> {
    return this.authService.deleteBlog(reqBody);
  }

}
