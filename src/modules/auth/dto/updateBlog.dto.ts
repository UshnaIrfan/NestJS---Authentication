import { ApiProperty } from '@nestjs/swagger';

export   class updateBlogDto
{
  @ApiProperty()
  userID: Number;

  @ApiProperty()
  id: Number;

  @ApiProperty()
  title: string;

}