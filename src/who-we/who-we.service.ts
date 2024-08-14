import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { CreateWhoWeDto } from './dto/create-who-we.dto';
import { UpdateWhoWeDto } from './dto/update-who-we.dto';
import { WhoWe, WhoWeDocument } from './entities/who-we.entity';

@ApiTags('Who-We')
@Injectable()
export class WhoWeService {
  constructor(
    @InjectModel(WhoWe.name)
    private readonly whoWeModel: Model<WhoWeDocument>,
  ) {}

  async create(createWhoWeDto: CreateWhoWeDto) {
    const createdService = new this.whoWeModel(createWhoWeDto);
    return createdService.save();
  }

  async findAll() {
    return this.whoWeModel.find().exec();
  }

  async findOne(id: string) {
    return this.whoWeModel.findById(id).exec();
  }

  async update(id: string, updateWhoWeDto: UpdateWhoWeDto) {
    return this.whoWeModel
      .findByIdAndUpdate(id, updateWhoWeDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.whoWeModel.findByIdAndDelete(id).exec();
  }
}
