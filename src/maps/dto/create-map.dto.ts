import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMapDto {
  @ApiProperty({ description: 'The name of the map' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Minimum latitude of the map bounds' })
  @IsNumber()
  @IsLatitude()
  lat_min: number;

  @ApiProperty({ description: 'Maximum latitude of the map bounds' })
  @IsNumber()
  @IsLatitude()
  lat_max: number;

  @ApiProperty({ description: 'Minimum longitude of the map bounds' })
  @IsNumber()
  @IsLongitude()
  lon_min: number;

  @ApiProperty({ description: 'Maximum longitude of the map bounds' })
  @IsNumber()
  @IsLongitude()
  lon_max: number;
}