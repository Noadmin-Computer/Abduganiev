import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMainDto } from './dto/create-main.dto';
import { UpdateMainDto } from './dto/update-main.dto';
import { Main, MainDocument } from './entities/main.entity';

@Injectable()
export class MainService {
  constructor(
    @InjectModel(Main.name)
    private readonly mainModel: Model<MainDocument>,
  ) {}

  async create(createMainDto: CreateMainDto): Promise<Main> {
    try {
      const createdService = new this.mainModel(createMainDto);
      return await createdService.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Main[]> {
    try {
      return await this.mainModel.find().populate('image').exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string): Promise<Main> {
    try {
      const main = await this.mainModel.findById(id).populate('image').exec();
      if (!main) {
        throw new NotFoundException(`Main with ID ${id} not found`);
      }
      return main;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateMainDto: UpdateMainDto): Promise<Main> {
    try {
      const updatedMain = await this.mainModel
        .findByIdAndUpdate(id, updateMainDto, { new: true })
        .populate('image')
        .exec();
      if (!updatedMain) {
        throw new NotFoundException(`Main with ID ${id} not found`);
      }
      return updatedMain;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<Main> {
    try {
      const removedMain = await this.mainModel.findByIdAndDelete(id).exec();
      if (!removedMain) {
        throw new NotFoundException(`Main with ID ${id} not found`);
      }
      return removedMain;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
