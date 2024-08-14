import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MainService, MainServiceSchema } from './entities/main-service.entity';
import { MainServiceController } from './main-service.controller';
import { MainServiceService } from './main-service.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MainService.name, schema: MainServiceSchema },
    ]),
  ],
  controllers: [MainServiceController],
  providers: [MainServiceService],
})
export class MainServiceModule {}
