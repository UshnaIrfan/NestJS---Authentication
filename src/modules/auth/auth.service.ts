import { Injectable } from "@nestjs/common";
import {NotAcceptableException} from "@nestjs/common";
import {SignupUserDto} from "./dto/signup-user.dto";
import {User} from "../users/schema/users.schema"
import * as bcrypt from 'bcrypt';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import { ForgotPasswordDto } from "./dto/forget-password-user.dto";
import {deleteDataDto } from "./dto/delete-user.dto"
import { blogDto} from "./dto/createBlog.dto"
import {deleteBlogDto } from "./dto/deleteBlog.dto"
import {updateBlogDto} from "./dto/updateBlog.dto"
@Injectable()
export class AuthService {
constructor(
  private userService:UsersService,
  private jwtService:JwtService,
  ) {}

     //sign up
     async signup(signUpUserDto:SignupUserDto) {
      const { password } = signUpUserDto;
      const user = await this.userService.createUser({
      ...signUpUserDto,
        password: await AuthService.hashPassword(password),
    });
      const payload = {
          username: user.username,
          email: user.email,
        };
        return{
           user,
          access_token: this.jwtService.sign(payload),
        };
  }
    //hashed password to save in database
    private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

    // used for login purpose(Validation)
    async validateUser( username: string ,password:string): Promise<User | null> {
    const user = await this.userService.findUserByUsername(username);
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!user)
    {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid)
    {
      console.log(passwordValid)
      return user;
    }
    return null;
  }
   // login API
      async login(user: any ) {
       const payload = {
        username: user.username,
        email: user.email,
      };
      return {
        username: user.username,
        email: user.email,
        access_token: this.jwtService.sign(payload),
    };
}

   // forget Password
    async forgotPassword(reqBody: ForgotPasswordDto) {
     const user = await this.userService.findUserByEmail( reqBody.email);
     if (!user)
     {
      throw new NotAcceptableException('could not find the user');
     }
    else
    {
      if(reqBody.password != reqBody.newPassword)
        {
          throw new NotAcceptableException('not matched password');
        }
      if(reqBody.password == reqBody.newPassword)
      {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(reqBody.newPassword,saltOrRounds);
        const result = await this.userService.updatePassword(reqBody.email, hashedPassword);
      }
      return ("Successfully updated")
    }
}

   //deleteUser
    async deleteUser(reqBody: deleteDataDto) {
    const user = await this.userService.findUserByEmail( reqBody.email);
    if (!user)
    {
      throw new NotAcceptableException('could not find the user');
    }
    else
    {
      const result = await this.userService.deleteUser(reqBody.email);
    }
    return("Successfully Deleted" )
  }

   // blogCreation
   async blog(BlogDto:blogDto) {
    const BlogGet = await this.userService.createBlog({
      ...BlogDto,
    });
    return BlogGet;
  }

   //Blog Get
   async blogGet(user: any) {
    const result = await this.userService.findUserByID(user);
    return result
  }

  //blog update
    async blogUpdate(reqBody: updateBlogDto) {
    const blogUser = await this.userService.findByID(reqBody.userID);
    if(!blogUser)
    {
    throw new NotAcceptableException(' unauthorized user id');
    }
   else
   {
    const blogId = await this.userService.findBlogID(reqBody.id);
    if(!blogId)
    {
      throw new NotAcceptableException('unauthorized  Blog id');
    }
     const result = await this.userService.updateBlog(reqBody.userID, reqBody.id,reqBody.title);
   }
      return ("Successfully updated")
  }

  //blog delete
  async deleteBlog(reqBody: deleteBlogDto) {
    const User = await this.userService.findByID(reqBody.userID);
    if(!User)
    {
      throw new NotAcceptableException(' unauthorized user id');
    }
    else
    {
      const Id = await this.userService.findBlogID(reqBody.id);
      if(!Id)
      {
        throw new NotAcceptableException('unauthorized  Blog id');
      }
       const result = await this.userService.deleteBlog(reqBody.userID, reqBody.id);

    }
    return ("Successfully deleted")
  }

}
