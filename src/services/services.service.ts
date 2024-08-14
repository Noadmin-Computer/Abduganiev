import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service, ServiceDocument } from './entities/service.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Service')
@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private readonly serviceModel: Model<ServiceDocument>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const createdService = new this.serviceModel(createServiceDto);
    return createdService.save();
  }

  async findAll() {
    return this.serviceModel.find().exec();
  }

  async findOne(id: string) {
    return this.serviceModel.findById(id).exec();
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    return this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.serviceModel.findByIdAndDelete(id).exec();
  }
}
