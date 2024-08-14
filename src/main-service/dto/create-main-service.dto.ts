import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateMainServiceDto {
  @ApiProperty({
    example: '60d21bb967d0d8992e610c85',
    description: 'ID of the media object',
  })
  @IsMongoId()
  image: string;

  @ApiProperty({ example: 'Service Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Service Text' })
  @IsString()
  text: string;
}
