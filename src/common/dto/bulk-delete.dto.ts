import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsInt, IsPositive } from 'class-validator';

export class BulkDeleteDto {
  @ApiProperty({
    description: 'Ids de los registros a eliminar',
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty({ message: 'Debe enviarse al menos un id' })
  @ArrayMaxSize(100, { message: 'Máximo 100 ids por petición' })
  @IsInt({ each: true, message: 'Los ids deben ser enteros' })
  @IsPositive({ each: true, message: 'Los ids deben ser positivos' })
  ids: number[];
}
