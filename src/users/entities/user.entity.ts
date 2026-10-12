import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: number;
  @ApiProperty({ description: 'The name of the user' })
  name: string;
  @ApiProperty({ description: 'The email of the user' })
  email: string;
  @ApiProperty({ description: 'The lapel of the user' })
  lapel: string;
  @ApiProperty({ description: 'The status of the user' })
  status: string;
  @ApiProperty({ description: 'The role of the user' })
  role_id: number;
}