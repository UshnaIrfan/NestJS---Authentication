import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document  } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document ;

@Schema({
  collection: 'users',
  timestamps: true,
})

@Schema()
export class User {

  @Prop()
  @ApiProperty()
  id: Number;

  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop()
  password: string;

  @ApiProperty()
  @Prop()
  email: string;
}
export const UserSchema =SchemaFactory.createForClass(User);

