import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortfolioMainDto {
  @ApiProperty({ example: 'Main Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Main Text' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
