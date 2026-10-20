import { ApiProperty } from '@nestjs/swagger';

export class Map {
  @ApiProperty({ description: 'The unique identifier of the map' })
  id: number;
  @ApiProperty({ description: 'The name of the map' })
  name: string;
  @ApiProperty({ description: 'Minimum latitude of the map bounds' })
  lat_min: number;
  @ApiProperty({ description: 'Maximum latitude of the map bounds' })
  lat_max: number;
  @ApiProperty({ description: 'Minimum longitude of the map bounds' })
  lon_min: number;
  @ApiProperty({ description: 'Maximum longitude of the map bounds' })
  lon_max: number;
}