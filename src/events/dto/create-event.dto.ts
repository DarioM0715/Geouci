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

  @ApiProperty({ required: false, default: 'pending' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsBoolean()
  its_official: boolean;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  categoryId: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  locationId: number;
}