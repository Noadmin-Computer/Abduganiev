import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({ required: false, description: 'Page number', default: 1 })
  page?: number = 1;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    description: 'Number of items per page',
    default: 10,
  })
  limit?: number = 10;
}
