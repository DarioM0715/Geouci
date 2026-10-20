import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReactionDto {
  @ApiProperty({ description: 'The type of the reaction' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: 'The user who reacted' })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ description: 'The event the reaction belongs to' })
  @IsInt()
  @IsPositive()
  eventId: number;
}