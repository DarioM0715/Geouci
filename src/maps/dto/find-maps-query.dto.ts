import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';

export class FindMapsQueryDto extends PaginationQueryDto {
  @ApiProperty({ required: false, description: 'Part of the name (partial match)' })
  @IsOptional()
  @IsString()
  name?: string;
}
