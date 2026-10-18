import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto.js';
import { QueryBoolean } from '../../common/decorators/query-boolean.decorator.js';
import { Role } from '../../generated/prisma/enums.js';

export class FindUsersQueryDto extends PaginationQueryDto {
  @ApiProperty({ required: false, description: 'Part of the name (partial match)' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false, description: 'Part of the email (partial match)' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false, description: 'Part of the lapel (partial match)' })
  @IsOptional()
  @IsString()
  lapel?: string;

  @ApiProperty({ required: false, enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ required: false })
  @IsOptional()
  @QueryBoolean()
  ist_resident?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @QueryBoolean()
  suspended?: boolean;
}
