import { PartialType } from '@nestjs/swagger';
import { CreateAboutBannerDto } from './create-about-banner.dto';

export class UpdateAboutBannerDto extends PartialType(CreateAboutBannerDto) {}
