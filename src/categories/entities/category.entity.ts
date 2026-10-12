import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({ description: 'The unique identifier of the category' })
  id: number;
  @ApiProperty({ description: 'The name of the category' })
  name: string;
  @ApiProperty({ description: 'The description of the category' })
  description: string | null;
}