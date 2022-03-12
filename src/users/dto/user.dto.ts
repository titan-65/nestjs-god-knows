import {IsNotEmpty, IsString, IsEmail} from 'class-validator';

export class UserDto {
  @IsNotEmpty() id: number;
  @IsNotEmpty() username: string;
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() lastName: string;
  @IsNotEmpty() @IsEmail() email: string;
}
