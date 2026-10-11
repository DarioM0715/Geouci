import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class CreateEventDto {
  @ApiProperty({
    description: "The name of the event"
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  end_date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsBoolean()
  its_official: boolean;
}