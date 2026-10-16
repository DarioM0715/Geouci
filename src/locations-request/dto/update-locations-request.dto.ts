import { IsDate, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
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
  applicantId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  done_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  managerId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  locationId?: number;

  @ApiProperty({ required: false, enum: LocationRequestStatus })
  @IsOptional()
  @IsEnum(LocationRequestStatus)
  status?: LocationRequestStatus;
}
