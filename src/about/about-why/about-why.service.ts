import { Injectable } from '@nestjs/common';
import { CreateAboutWhyDto } from './dto/create-about-why.dto';
import { UpdateAboutWhyDto } from './dto/update-about-why.dto';
import { AboutWhy, AboutWhyDocument } from './entities/about-why.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('About')
@Injectable()
export class AboutWhyService {
  constructor(
    @InjectModel(AboutWhy.name)
    private readonly aboutWhyModel: Model<AboutWhyDocument>,
  ) {}

  async create(createAboutWhyDto: CreateAboutWhyDto) {
    const createdService = new this.aboutWhyModel(createAboutWhyDto);
    return createdService.save();
  }

  async findAll() {
    return this.aboutWhyModel.find().exec();
  }

  async findOne(id: string) {
    return this.aboutWhyModel.findById(id).exec();
  }

  async update(id: string, updateAboutWhyDto: UpdateAboutWhyDto) {
    return this.aboutWhyModel
      .findByIdAndUpdate(id, updateAboutWhyDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.aboutWhyModel.findByIdAndDelete(id).exec();
  }
}
