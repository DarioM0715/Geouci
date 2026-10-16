import { ApiProperty } from '@nestjs/swagger';
import { LocationRequestStatus } from '../../generated/prisma/enums.js';

export class LocationsRequest {
  @ApiProperty({ description: 'The unique identifier of the location request' })
  id: number;
  @ApiProperty({ description: 'The name of the location request' })
  name: string;
  @ApiProperty({ description: 'The description of the location request' })
  description: string | null;
  @ApiProperty({ description: 'The user who made the request' })
  applicantId: number;
  @ApiProperty({ description: 'The requested category' })
  categoryId: number;
  @ApiProperty({ description: 'The manager who handled the request' })
  managerId: number | null;
  @ApiProperty({ description: 'The resulting location' })
  locationId: number | null;
  @ApiProperty({ description: 'The reason of the request' })
  reason: string;
  @ApiProperty({ description: 'The status of the request', enum: LocationRequestStatus })
  status: LocationRequestStatus;
  @ApiProperty({ description: 'The date the request was made' })
  request_date: Date;
  @ApiProperty({ description: 'The date the request was completed' })
  done_at: Date;
}
