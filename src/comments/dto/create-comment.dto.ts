import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'The content of the comment' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: 'The user who wrote the comment' })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ description: 'The event the comment belongs to' })
  @IsInt()
  @IsPositive()
  eventId: number;
}
