import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from 'src/media/entities/media.entity';
import { Partner, PartnerSchema } from './entities/partner.entity';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Partner.name, schema: PartnerSchema },
      { name: Media.name, schema: MediaSchema },
    ]),
  ],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
