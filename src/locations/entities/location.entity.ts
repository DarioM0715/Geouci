import { ApiProperty } from '@nestjs/swagger';

export class Location {
  @ApiProperty({ description: 'The unique identifier of the location' })
  id: number;
  @ApiProperty({ description: 'The name of the location' })
  name: string;
  @ApiProperty({ description: 'The description of the location' })
  description: string;
  @ApiProperty({ description: 'Latitude of the location' })
  latitude: number;
  @ApiProperty({ description: 'Longitude of the location' })
  longitude: number;
  @ApiProperty({ description: 'Indicates if the location is official' })
  its_official: boolean;
  @ApiProperty({ description: 'The category this location belongs to' })
  categoryId: number;
  @ApiProperty({ description: 'The map this location belongs to' })
  mapId: number;
  @ApiProperty({ description: 'The date the location was created' })
  created_at: Date;
}
