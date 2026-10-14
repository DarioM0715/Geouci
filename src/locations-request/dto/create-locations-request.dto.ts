import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LocationRequestStatus } from '../../generated/prisma/enums.js';

export class CreateLocationsRequestDto {
  @ApiProperty({ description: 'The name of the location request' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The user who made the request' })
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ description: 'The requested category' })
  @IsInt()
  @IsPositive()
  categoryId: number;

  @ApiProperty({ required: false, enum: LocationRequestStatus })
  @IsOptional()
  @IsEnum(LocationRequestStatus)
  status?: LocationRequestStatus;
}