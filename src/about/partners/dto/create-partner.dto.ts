import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CreatePartnerDto {
  @ApiProperty({
    type: String,
    description: 'Media ID',
    example: '60d5c5f3d6c15b4e8b1a2b3c',
  })
  @IsMongoId()
  image: string;
}
