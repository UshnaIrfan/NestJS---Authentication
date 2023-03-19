import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from '@nestjs/common';
import {User ,UserDocument} from "./schema/users.schema";
import {Blog,BlogDocument} from "./schema/blog.schema";
import { HydratedDocument, Model } from "mongoose";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private userModel:Model<UserDocument>,
    @InjectModel(Blog.name) private blogModel:Model<BlogDocument>,
  ) {}

  //used for sign up
  async createUser(user: User): Promise<any>
  {
    return this.userModel.create(user);
  }

   //used for login
  async findUserByUsername(username: string): Promise<User | null>
  {
    return this.userModel.findOne({
      username,
    })
  }

  //update password
   async updateData(email: string, password: string): Promise<User | null>
   {
    const filter = { email: email };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        password: password
      },
    };
    return this.userModel.findOneAndUpdate(filter, updateDoc, options);
  }

// delete User
    async deleteData(email: string): Promise<User | null>
    {
    return this.userModel.findOneAndDelete({
      email,
    },);
   }

  //find email for updatePassword and delete User and token(authorization)
  async findUserByEmail(email:string): Promise<User | null>
  {
    return this.userModel.findOne({
      email,
    });
  }

  //Blog Creation
  async Createblog(blog: Blog): Promise<any>
  {
    return this.blogModel.create(blog);
  }

  //Blog Get
  async findUserById( userID:string): Promise<{ data: Array<HydratedDocument<BlogDocument, {}, {}>> }> {
    const blogresult = await this.blogModel.find({ userID:  userID }).exec();
    let blogData = {
      data: blogresult
    }
    return blogData
  }

  //Blog update
  async update(userID:Number ,id:Number, title: string): Promise<Blog| null>
  {
    const filter = { userID: userID , id:id};
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        title: title
      },
    };
    return this.blogModel.findOneAndUpdate(filter, updateDoc, options);
  }

//Blog Delete
  async delete(userID:Number,id:Number): Promise<Blog | null>
  {
    return this.blogModel.findOneAndDelete({
      userID,
      id
    },);
  }

  // used for Blog update and Delete (userID)
  async findID (userID:Number): Promise<Blog| null>
  {
    return this.blogModel.findOne({
      userID
    });
  }
  //Blog update and Delete(ID)
  async findbyId (id:Number): Promise<Blog| null>
  {
    return this.blogModel.findOne({
      id
    });
  }
}



