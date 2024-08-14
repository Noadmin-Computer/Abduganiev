import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 'Review Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Review Text' })
  @IsString()
  text: string;

  @ApiProperty({
    example: '60d21bb967d0d8992e610c85',
    description: 'ID of the media object',
  })
  @IsMongoId()
  avatar: string;

  @ApiProperty({ example: 'Avatar title' })
  @IsString()
  avatar_title: string;

  @ApiProperty({ example: 'Avatar text' })
  @IsString()
  avatar_text: string;
}
