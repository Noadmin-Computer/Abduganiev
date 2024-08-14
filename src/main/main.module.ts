import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Main, MainSchema } from './entities/main.entity';
import { MainController } from './main.controller';
import { MainService } from './main.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Main.name, schema: MainSchema }]),
  ],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
