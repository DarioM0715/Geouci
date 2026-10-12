import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  status?: string;
}