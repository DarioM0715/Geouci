import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateComplaintDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  reason?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  userId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  eventId?: number;
}