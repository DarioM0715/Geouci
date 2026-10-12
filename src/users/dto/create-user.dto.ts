import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The lapel of the user' })
  @IsString()
  @IsNotEmpty()
  lapel: string;

  @ApiProperty({ description: 'The password hash of the user' })
  @IsString()
  @IsNotEmpty()
  password_hash: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ description: 'The role of the user' })
  @IsInt()
  @IsPositive()
  role_id: number;
}