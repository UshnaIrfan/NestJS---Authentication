import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document  } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "@nestjs/class-validator";

export type BlogDocument = Blog & Document ;

@Schema({
  collection: 'blog',
  timestamps: true,
})

@Schema()
export class Blog {

  @ApiProperty()
  @Prop()
  userID: Number;

  @ApiProperty()
  @Prop()
  id: Number;

  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  subtitle: string;

  @ApiProperty()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop()
  @IsString()
  blogImage:string
}
export const BlogSchema =SchemaFactory.createForClass(Blog);

