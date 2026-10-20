import { ApiProperty } from '@nestjs/swagger';

export class Complaint {
  @ApiProperty({ description: 'The unique identifier of the complaint' })
  id: number;
  @ApiProperty({ description: 'The reason of the complaint' })
  reason: string;
  @ApiProperty({ description: 'The user who filed the complaint' })
  userId: number;
  @ApiProperty({ description: 'The event the complaint refers to' })
  eventId: number;
  @ApiProperty({ description: 'The date the complaint was created' })
  created_at: Date;
}