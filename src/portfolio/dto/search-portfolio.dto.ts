import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchPortfolioDto {
  @ApiProperty({ description: 'Card title to search for', required: false })
  @IsOptional()
  @IsString()
  title?: string;
}
