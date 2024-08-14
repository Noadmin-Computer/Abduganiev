import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhoWe, WhoWeSchema } from './entities/who-we.entity';
import { WhoWeController } from './who-we.controller';
import { WhoWeService } from './who-we.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WhoWe.name, schema: WhoWeSchema }]),
  ],
  controllers: [WhoWeController],
  providers: [WhoWeService],
})
export class WhoWeModule {}
