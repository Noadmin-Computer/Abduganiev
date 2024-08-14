import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateAboutWhyDto {
  @ApiProperty({ example: 'About Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'About Text' })
  @IsString()
  text: string;

  @ApiProperty({
    example: '60d21bb967d0d8992e610c85',
    description: 'ID of the media object',
  })
  @IsMongoId()
  image: string;

  @ApiProperty({ type: 'array', items: { type: 'string' } })
  @IsArray()
  sub_text: string[];
}
