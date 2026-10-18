import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import { LocationRequestStatus } from '../../generated/prisma/enums.js';

export class FindLocationsRequestQueryDto extends PaginationQueryDto {
  @ApiProperty({ required: false, description: 'Part of the name (partial match)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, enum: LocationRequestStatus })
  @IsOptional()
  @IsEnum(LocationRequestStatus)
  status?: LocationRequestStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  applicantId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  managerId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  locationId?: number;
}
