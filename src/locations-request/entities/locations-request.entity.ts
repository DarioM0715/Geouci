import { ApiProperty } from '@nestjs/swagger';

export class LocationsRequest {
  @ApiProperty({ description: 'The unique identifier of the location request' })
  id: number;
  @ApiProperty({ description: 'The name of the location request' })
  name: string;
  @ApiProperty({ description: 'The description of the location request' })
  description: string | null;
  @ApiProperty({ description: 'The user who made the request' })
  userId: number;
  @ApiProperty({ description: 'The requested category' })
  categoryId: number;
  @ApiProperty({ description: 'The status of the request' })
  status: string;
  @ApiProperty({ description: 'The date the request was made' })
  request_date: Date;
}