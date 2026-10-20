import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
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
  applicantId: number;

  @ApiProperty({ description: 'The requested category' })
  @IsInt()
  @IsPositive()
  categoryId: number;

  @ApiProperty({ description: 'The reason of the request' })
  @IsString()
  reason: string;

  @ApiProperty({ description: 'The date the request was completed' })
  @Type(() => Date)
  @IsDate()
  done_at: Date;

  @ApiProperty({ required: false, description: 'The manager who handled the request' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  managerId?: number;

  @ApiProperty({ required: false, description: 'The resulting location' })
  @IsOptional()
  @IsInt()
  @IsPositive()
  locationId?: number;

  @ApiProperty({ required: false, enum: LocationRequestStatus })
  @IsOptional()
  @IsEnum(LocationRequestStatus)
  status?: LocationRequestStatus;
}
