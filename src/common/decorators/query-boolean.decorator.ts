import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export const QueryBoolean = () =>
  applyDecorators(
    Transform(({ value }) => value === 'true' || value === true),
    IsBoolean(),
  );
