import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start_date?: Date;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end_date?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  category?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  its_official?: boolean;
}