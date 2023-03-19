import { ApiProperty } from '@nestjs/swagger';

export   class SignupUserDto
{
 @ApiProperty()
 id: Number;

 @ApiProperty()
 username: string;

 @ApiProperty()
 password: string;

 @ApiProperty()
 email: string;
}