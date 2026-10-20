import { ApiProperty } from '@nestjs/swagger';

export class Reaction {
  @ApiProperty({ description: 'The unique identifier of the reaction' })
  id: number;
  @ApiProperty({ description: 'The type of the reaction' })
  type: string;
  @ApiProperty({ description: 'The user who reacted' })
  userId: number;
  @ApiProperty({ description: 'The event the reaction belongs to' })
  eventId: number;
  @ApiProperty({ description: 'The date the reaction was created' })
  created_at: Date;
}