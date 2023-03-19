import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {UsersRepository} from "./users.repository";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "./schema/users.schema";
import {Blog,BlogSchema} from "./schema/blog.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema},
      { name: Blog.name, schema: BlogSchema},
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService,UsersRepository],
  exports: [
    MongooseModule,
    UsersRepository,
    UsersService,
  ],
})
export default class UsersModule {}
