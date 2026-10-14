import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMapDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsLatitude()
  lat_min?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsLatitude()
  lat_max?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsLongitude()
  lon_min?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsLongitude()
  lon_max?: number;
}