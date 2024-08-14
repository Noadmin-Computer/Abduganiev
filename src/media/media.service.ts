import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media, MediaDocument } from './entities/media.entity';

@ApiTags('Media')
@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name)
    private readonly mediaModel: Model<MediaDocument>,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    const createdService = new this.mediaModel(createMediaDto);
    return createdService.save();
  }

  async findAll() {
    return this.mediaModel.find().exec();
  }

  async findOne(id: string) {
    return this.mediaModel.findById(id).exec();
  }

  async update(id: string, updateMediaDto: UpdateMediaDto) {
    return this.mediaModel
      .findByIdAndUpdate(id, updateMediaDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.mediaModel.findByIdAndDelete(id).exec();
  }
}
