import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutWhyController } from './about-why.controller';
import { AboutWhyService } from './about-why.service';
import { AboutWhy, AboutWhySchema } from './entities/about-why.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AboutWhy.name, schema: AboutWhySchema },
    ]),
  ],
  controllers: [AboutWhyController],
  providers: [AboutWhyService],
})
export class AboutWhyModule {}
