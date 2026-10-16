import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/enums.js';

export class User {
  @ApiProperty({ description: 'The unique identifier of the user' })
  id: number;
  @ApiProperty({ description: 'The name of the user' })
  name: string;
  @ApiProperty({ description: 'The email of the user' })
  email: string;
  @ApiProperty({ description: 'The lapel of the user' })
  lapel: string;
  @ApiProperty({ description: 'The role of the user', enum: Role })
  role: Role;
  @ApiProperty({ description: 'Indicates if the user is a resident' })
  ist_resident: boolean;
  @ApiProperty({ description: 'Indicates if the user is suspended' })
  suspended: boolean;
  @ApiProperty({ description: 'The reason of the suspension' })
  reason_suspension: string | null;
  @ApiProperty({ description: 'The date the user was created' })
  created_at: Date;
}
