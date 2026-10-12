import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto {
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
  @IsNumber()
  @IsLatitude()
  latitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsLongitude()
  longitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @IsPositive()
  userId?: number;
}