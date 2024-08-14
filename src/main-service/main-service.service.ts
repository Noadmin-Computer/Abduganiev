import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMainServiceDto } from './dto/create-main-service.dto';
import { UpdateMainServiceDto } from './dto/update-main-service.dto';
import {
  MainService,
  MainServiceDocument,
} from './entities/main-service.entity';

@Injectable()
export class MainServiceService {
  constructor(
    @InjectModel(MainService.name)
    private readonly mainServiceModel: Model<MainServiceDocument>,
  ) {}

  async create(
    createMainServiceDto: CreateMainServiceDto,
  ): Promise<MainService> {
    try {
      const createdMainService = new this.mainServiceModel(
        createMainServiceDto,
      );
      return await createdMainService.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<MainService[]> {
    try {
      return await this.mainServiceModel.find().populate('image').exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string): Promise<MainService> {
    try {
      const mainService = await this.mainServiceModel
        .findById(id)
        .populate('image')
        .exec();
      if (!mainService) {
        throw new NotFoundException(`MainService with ID ${id} not found`);
      }
      return mainService;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(
    id: string,
    updateMainServiceDto: UpdateMainServiceDto,
  ): Promise<MainService> {
    try {
      const updatedMainService = await this.mainServiceModel
        .findByIdAndUpdate(id, updateMainServiceDto, { new: true })
        .populate('image')
        .exec();
      if (!updatedMainService) {
        throw new NotFoundException(`MainService with ID ${id} not found`);
      }
      return updatedMainService;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<MainService> {
    try {
      const removedMainService = await this.mainServiceModel
        .findByIdAndDelete(id)
        .exec();
      if (!removedMainService) {
        throw new NotFoundException(`MainService with ID ${id} not found`);
      }
      return removedMainService;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
