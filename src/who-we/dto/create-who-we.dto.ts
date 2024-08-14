import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateWhoWeDto {
  @ApiProperty({ example: 'Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Text' })
  @IsString()
  text: string;

  @ApiProperty({ example: 'Experience count' })
  @IsString()
  experience: string;

  @ApiProperty({ example: 'Projects count' })
  @IsString()
  projects: string;

  @ApiProperty({ example: 'Offices count' })
  @IsString()
  offices: string;

  @ApiProperty({
    example: '60d21bb967d0d8992e610c85',
    description: 'ID of the media object',
  })
  @IsMongoId()
  image: string;
}
