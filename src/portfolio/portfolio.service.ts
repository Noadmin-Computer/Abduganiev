import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { SearchPortfolioDto } from './dto/search-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio, PortfolioDocument } from './entities/portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<PortfolioDocument>,
  ) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    try {
      const createdPortfolio = new this.portfolioModel(createPortfolioDto);
      return await createdPortfolio.save();
    } catch (error) {
      console.error('Error creating portfolio:', error.message);
      throw new BadRequestException('Error creating portfolio');
    }
  }

  async findAll(query: SearchPortfolioDto & PaginationDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    const skip = (page - 1) * limit;

    const searchCriteria: any = {};

    if (query.title) {
      searchCriteria['title'] = { $regex: new RegExp(query.title, 'i') };
    }

    try {
      // Fetch paginated and filtered portfolios
      const [data, total] = await Promise.all([
        this.portfolioModel
          .find(searchCriteria)
          .skip(skip)
          .limit(limit)
          .populate({
            path: 'card.image',
            select: 'image path',
          })
          .exec(),

        this.portfolioModel.countDocuments(searchCriteria),
      ]);

      const totalPages = Math.ceil(total / limit);
      const next = page < totalPages;

      return {
        data,
        total,
        currentPage: page,
        totalPages,
        next,
      };
    } catch (error) {
      console.error('Error fetching portfolios:', error.message);
      throw new BadRequestException('Error fetching portfolios');
    }
  }

  async findOne(id: string) {
    try {
      const portfolio = await this.portfolioModel
        .findById(id)
        .populate({
          path: 'card.image',
          select: 'image path',
        })
        .exec();
      if (!portfolio) {
        throw new NotFoundException('Portfolio not found');
      }
      return portfolio;
    } catch (error) {
      console.error('Error fetching portfolio:', error.message);
      throw new BadRequestException('Error fetching portfolio');
    }
  }

  async update(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    try {
      const updatedPortfolio = await this.portfolioModel
        .findByIdAndUpdate(id, updatePortfolioDto, { new: true })
        .populate({
          path: 'card.image',
          select: 'image path',
        })
        .exec();
      if (!updatedPortfolio) {
        throw new NotFoundException('Portfolio not found');
      }
      return updatedPortfolio;
    } catch (error) {
      console.error('Error updating portfolio:', error.message);
      throw new BadRequestException('Error updating portfolio');
    }
  }

  async remove(id: string) {
    try {
      const result = await this.portfolioModel
        .findByIdAndDelete(id)
        .populate({
          path: 'card.image',
          select: 'image path',
        })
        .exec();
      if (!result) {
        throw new NotFoundException('Portfolio not found');
      }
      return result;
    } catch (error) {
      console.error('Error deleting portfolio:', error.message);
      throw new BadRequestException('Error deleting portfolio');
    }
  }
}
