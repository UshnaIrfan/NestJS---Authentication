import { Injectable } from '@nestjs/common';
import {UsersRepository} from "./users.repository";
import { User } from "./schema/users.schema";
import { Blog, BlogDocument } from "./schema/blog.schema";
import { HydratedDocument } from "mongoose";
import { ObjectId } from "mongodb";


@Injectable()
export class UsersService {
   constructor(
     private readonly  usersRepository:UsersRepository
   ) {}

   //used for sign up
    async createUser(user: any): Promise<User>
    {
    return this.usersRepository.createUser(user);
    }

   //used for login
   async findUserByUsername(username: string): Promise<User | null>
   {
    return this.usersRepository.findUserByUsername(username);
   }

  //update password
   async updatePassword(email: string, password: string): Promise<User | null>
   {
   return this.usersRepository.updateData(email, password);
   }

 // delete User
   async deleteUser(email: string): Promise<User | null>
   {
    return this.usersRepository.deleteData(email);
   }

  // find email for updatePassword and delete user  and user(authorization)
  async findUserByEmail(email:string): Promise<User | null>
  {
    return this.usersRepository.findUserByEmail(email);
  }

  //Blog Creation
  async createBlog(blog: any): Promise<Blog>
  {
    return this.usersRepository.Createblog(blog );
  }

  //Blog Get
  async findUserByID( userID:string): Promise<{ data: Array<HydratedDocument<BlogDocument, {}, {}>> }>
  {
    return this.usersRepository.findUserById( userID);
  }

   // Blog Update
  async updateBlog(userID:Number ,id:Number, title: string): Promise<Blog | null>
  {
    return this.usersRepository.update(userID ,id, title);
  }

 // BLog Delete
  async deleteBlog(userID:Number,id:Number): Promise<Blog| null>
  {
    return this.usersRepository.delete(userID ,id);
  }

  //  used for Blog update and Delete (userID)
  async findByID(userID:Number): Promise<Blog| null>
  {
    return this.usersRepository.findID(userID);
  }
  //used for Blog update and Delete (ID)
  async findBlogID(id:Number): Promise<Blog| null>
  {
    return this.usersRepository.findbyId(id);
  }
}
