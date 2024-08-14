import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateAboutBannerDto {
  @ApiProperty({ example: 'About-Banner Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'About-Banner Text' })
  @IsString()
  text: string;

  @ApiProperty({
    example: '60d21bb967d0d8992e610c85',
    description: 'ID of the media object',
  })
  @IsMongoId()
  image: string;
}
