import { ApiProperty } from '@nestjs/swagger';
import { IsString } from '@nestjs/class-validator';
export   class blogDto
{
  @ApiProperty()
  userID: Number;

  @ApiProperty()
  id: Number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsString()
  blogImage:string

}