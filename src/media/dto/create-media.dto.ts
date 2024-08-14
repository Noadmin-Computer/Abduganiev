import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({ example: 'image_id' })
  @IsString()
  image: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsString()
  path?: string;
}
