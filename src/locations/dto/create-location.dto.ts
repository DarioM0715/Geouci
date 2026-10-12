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

export class CreateLocationDto {
  @ApiProperty({ description: 'The name of the location' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Latitude of the location' })
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the location' })
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @ApiProperty({ description: 'The category this location belongs to' })
  @IsInt()
  @IsPositive()
  categoryId: number;

  @ApiProperty({ description: 'The user who created the location' })
  @IsInt()
  @IsPositive()
  userId: number;
}