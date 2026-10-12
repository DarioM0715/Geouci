import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty({ description: 'The unique identifier of the comment' })
  id: number;
  @ApiProperty({ description: 'The content of the comment' })
  content: string;
  @ApiProperty({ description: 'The user who wrote the comment' })
  userId: number;
  @ApiProperty({ description: 'The event the comment belongs to' })
  eventId: number;
  @ApiProperty({ description: 'The date the comment was created' })
  created_at: Date;
}