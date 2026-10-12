import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComplaintDto {
  @ApiProperty({ description: 'The reason of the complaint' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ description: 'The user who filed the complaint' })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ description: 'The event the complaint refers to' })
  @IsInt()
  @IsPositive()
  eventId: number;
}