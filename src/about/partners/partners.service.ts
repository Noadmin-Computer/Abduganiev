import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from '../../pagination/dto/pagination.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Partner, PartnerDocument } from './entities/partner.entity';

@Injectable()
export class PartnersService {
  constructor(
    @InjectModel(Partner.name)
    private readonly partnerModel: Model<PartnerDocument>,
  ) {}

  async create(createPartnerDto: CreatePartnerDto) {
    try {
      const createdPartner = new this.partnerModel(createPartnerDto);
      return await createdPartner.save();
    } catch (err) {
      throw err;
    }
  }

  async findAll(paginationDto?: PaginationDto) {
    const { page, limit } = paginationDto || {};
    let query = this.partnerModel.find().populate({
      path: 'image',
      select: 'image path',
    });

    if (page && limit) {
      const skip = (Number(page) - 1) * Number(limit);
      query = query.skip(skip).limit(Number(limit));
    }

    const data = await query.exec();
    const total = await this.partnerModel.countDocuments();
    const totalPages = limit ? Math.ceil(total / Number(limit)) : 1;
    const currentPage = page ? Number(page) : 1;
    const next = page ? currentPage < totalPages : false;

    return {
      data,
      total,
      currentPage,
      totalPages,
      next,
    };
  }

  async findOne(id: string) {
    return this.partnerModel
      .findById(id)
      .populate({
        path: 'image',
        select: 'image path',
      })
      .exec();
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    return this.partnerModel
      .findByIdAndUpdate(id, updatePartnerDto, { new: true })
      .populate({
        path: 'image',
        select: 'image path',
      })
      .exec();
  }

  async remove(id: string) {
    return this.partnerModel.findByIdAndDelete(id).exec();
  }
}
