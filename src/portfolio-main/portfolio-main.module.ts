import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PortfolioMain,
  PortfolioMainSchema,
} from './entities/portfolio-main.entity';
import { PortfolioMainController } from './portfolio-main.controller';
import { PortfolioMainService } from './portfolio-main.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PortfolioMain.name, schema: PortfolioMainSchema },
    ]),
  ],
  controllers: [PortfolioMainController],
  providers: [PortfolioMainService],
})
export class PortfolioMainModule {}
