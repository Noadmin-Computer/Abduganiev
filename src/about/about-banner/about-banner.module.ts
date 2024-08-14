import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutBannerController } from './about-banner.controller';
import { AboutBannerService } from './about-banner.service';
import { AboutBanner, AboutBannerSchema } from './entities/about-banner.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AboutBanner.name, schema: AboutBannerSchema },
    ]),
  ],
  controllers: [AboutBannerController],
  providers: [AboutBannerService],
})
export class AboutBannerModule {}
