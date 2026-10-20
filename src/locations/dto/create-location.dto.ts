import {
  IsBoolean,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ description: 'The name of the location' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the location' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Latitude of the location' })
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the location' })
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @ApiProperty({ description: 'Indicates if the location is official' })
  @IsBoolean()
  its_official: boolean;

  @ApiProperty({ description: 'The category this location belongs to' })
  @IsInt()
  @IsPositive()
  categoryId: number;

  @ApiProperty({ description: 'The map this location belongs to' })
  @IsInt()
  @IsPositive()
  mapId: number;
}
