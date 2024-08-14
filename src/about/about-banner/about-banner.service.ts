import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { CreateAboutBannerDto } from './dto/create-about-banner.dto';
import { UpdateAboutBannerDto } from './dto/update-about-banner.dto';
import {
  AboutBanner,
  AboutBannerDocument,
} from './entities/about-banner.entity';

@ApiTags('About')
@Injectable()
export class AboutBannerService {
  constructor(
    @InjectModel(AboutBanner.name)
    private readonly aboutBannerModel: Model<AboutBannerDocument>,
  ) {}

  async create(createAboutBannerDto: CreateAboutBannerDto) {
    const createdService = new this.aboutBannerModel(createAboutBannerDto);
    return createdService.save();
  }

  async findAll() {
    return this.aboutBannerModel.find().populate('image').exec();
  }

  async findOne(id: string) {
    return this.aboutBannerModel.findById(id).populate('image').exec();
  }

  async update(id: string, updateAboutBannerDto: UpdateAboutBannerDto) {
    return this.aboutBannerModel
      .findByIdAndUpdate(id, updateAboutBannerDto, { new: true })
      .populate('image')
      .exec();
  }

  async remove(id: string) {
    return this.aboutBannerModel.findByIdAndDelete(id).exec();
  }
}
