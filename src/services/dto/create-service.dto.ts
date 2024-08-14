import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ type: 'array', items: { type: 'string' } })
  @IsArray()
  title: [string];

  @ApiProperty({ type: 'array', items: { type: 'string' } })
  @IsArray()
  text: [string];

  @ApiProperty({
    example: '60d21bb967d0d8992e610c85',
    description: 'ID of the media object',
  })
  @IsMongoId()
  @IsOptional()
  image: string;
}
