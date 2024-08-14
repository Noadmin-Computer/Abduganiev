import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePortfolioMainDto } from './dto/create-portfolio-main.dto';
import { UpdatePortfolioMainDto } from './dto/update-portfolio-main.dto';
import {
  PortfolioMain,
  PortfolioMainDocument,
} from './entities/portfolio-main.entity';

@Injectable()
export class PortfolioMainService {
  constructor(
    @InjectModel(PortfolioMain.name)
    private readonly portfolioMainModel: Model<PortfolioMainDocument>,
  ) {}

  async create(createPortfolioMainDto: CreatePortfolioMainDto) {
    try {
      const createdPortfolioMain = new this.portfolioMainModel(
        createPortfolioMainDto,
      );
      return await createdPortfolioMain.save();
    } catch (error) {
      console.error('Error creating portfolioMain:', error.message);
      throw new BadRequestException('Error creating portfolioMain');
    }
  }

  async findAll(): Promise<PortfolioMain[]> {
    try {
      return await this.portfolioMainModel.find().populate('image').exec();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const portfolioMain = await this.portfolioMainModel
        .findById(id)
        .populate({
          path: 'card.image',
          select: 'image path',
        })
        .exec();
      if (!portfolioMain) {
        throw new NotFoundException('PortfolioMain not found');
      }
      return portfolioMain;
    } catch (error) {
      console.error('Error fetching portfolioMain:', error.message);
      throw new BadRequestException('Error fetching portfolioMain');
    }
  }

  async update(id: string, updatePortfolioMainDto: UpdatePortfolioMainDto) {
    try {
      const updatedPortfolioMain = await this.portfolioMainModel
        .findByIdAndUpdate(id, updatePortfolioMainDto, { new: true })
        .populate({
          path: 'card.image',
          select: 'image path',
        })
        .exec();
      if (!updatedPortfolioMain) {
        throw new NotFoundException('PortfolioMain not found');
      }
      return updatedPortfolioMain;
    } catch (error) {
      console.error('Error updating portfolioMain:', error.message);
      throw new BadRequestException('Error updating portfolioMain');
    }
  }

  async remove(id: string) {
    try {
      const result = await this.portfolioMainModel
        .findByIdAndDelete(id)
        .populate({
          path: 'card.image',
          select: 'image path',
        })
        .exec();
      if (!result) {
        throw new NotFoundException('PortfolioMain not found');
      }
      return result;
    } catch (error) {
      console.error('Error deleting portfolioMain:', error.message);
      throw new BadRequestException('Error deleting portfolioMain');
    }
  }
}
