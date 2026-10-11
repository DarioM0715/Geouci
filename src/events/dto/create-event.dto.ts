import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Date)
  @IsDate()
  start_date: Date;

  @Type(() => Date)
  @IsDate()
  end_date: Date;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsBoolean()
  its_official: boolean;
}