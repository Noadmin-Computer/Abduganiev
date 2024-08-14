import { PartialType } from '@nestjs/swagger';
import { CreateAboutWhyDto } from './create-about-why.dto';

export class UpdateAboutWhyDto extends PartialType(CreateAboutWhyDto) {}
