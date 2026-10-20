import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: 'The name of the event' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  end_date: Date;

  @ApiProperty({ description: 'Indicates if the event is official' })
  @IsBoolean()
  its_official: boolean;

  @ApiProperty({ description: 'Indicates if the event is outstanding' })
  @IsBoolean()
  outstanding: boolean;

  @ApiProperty({ description: 'The organizer of the event' })
  @IsInt()
  @IsPositive()
  organizerId: number;

  @ApiProperty({ description: 'The category of the event' })
  @IsInt()
  @IsPositive()
  categoryId: number;

  @ApiProperty({ description: 'The map the event belongs to' })
  @IsInt()
  @IsPositive()
  mapId: number;
}
