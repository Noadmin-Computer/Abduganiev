import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewDocument } from './entities/review.entity';

@ApiTags('Review')
@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const createdService = new this.reviewModel(createReviewDto);
    return createdService.save();
  }

  async findAll() {
    return this.reviewModel.find().exec();
  }

  async findOne(id: string) {
    return this.reviewModel.findById(id).exec();
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
}
