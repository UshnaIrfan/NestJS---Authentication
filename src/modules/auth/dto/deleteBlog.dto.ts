import { ApiProperty } from '@nestjs/swagger';

export   class deleteBlogDto {

  @ApiProperty()
  userID: Number;

  @ApiProperty()
  id: Number;
}