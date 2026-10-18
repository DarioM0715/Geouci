import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import { QueryBoolean } from '../../common/decorators/query-boolean.decorator.js';

export class FindEventsQueryDto extends PaginationQueryDto {
  @ApiProperty({ required: false, description: 'Part of the name (partial match)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @QueryBoolean()
  its_official?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @QueryBoolean()
  outstanding?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  organizerId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  mapId?: number;

  @ApiProperty({ required: false, description: 'Events starting on or after this date' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_date_from?: Date;

  @ApiProperty({ required: false, description: 'Events starting on or before this date' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_date_to?: Date;
}
