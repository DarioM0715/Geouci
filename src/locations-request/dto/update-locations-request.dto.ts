import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LocationRequestStatus } from '../../generated/prisma/enums.js';

export class UpdateLocationsRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  userId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number;

  @ApiProperty({ required: false, enum: LocationRequestStatus })
  @IsOptional()
  @IsEnum(LocationRequestStatus)
  status?: LocationRequestStatus;
}