import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMainDto {
  @ApiProperty({ example: 'Main Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Main Text' })
  @IsString()
  text: string;

  @ApiProperty({
    example: '60d21bb967d0d8992e610c85',
    description: 'ID of the media object',
  })
  @IsMongoId()
  @IsOptional()
  image: string;
}
