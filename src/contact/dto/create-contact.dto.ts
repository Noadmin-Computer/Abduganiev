import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'Mon-Tue, from 10am to 19pm' })
  @IsString()
  work_mode: string;

  @ApiProperty({ example: '+998-12-345-67-89' })
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'email@email.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Neighborhood name, Street name' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'https://t.me/' })
  @IsString()
  telegram: string;

  @ApiProperty({ example: 'https://uz.linkedin.com/' })
  @IsString()
  linkedin: string;

  @ApiProperty({ example: 'https://youtube.com/' })
  @IsString()
  youtube: string;

  @ApiProperty({ example: 'https://www.instagram.com/' })
  @IsString()
  instagram: string;

  @ApiProperty({ example: 'https://www.facebook.com/' })
  @IsString()
  facebook: string;
}
