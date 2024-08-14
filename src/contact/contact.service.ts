import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact, ContactDocument } from './entities/contact.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Partner')
@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const createdService = new this.contactModel(createContactDto);
    return createdService.save();
  }

  async findAll() {
    return this.contactModel.find().exec();
  }

  async findOne(id: string) {
    return this.contactModel.findById(id).exec();
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return this.contactModel
      .findByIdAndUpdate(id, updateContactDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.contactModel.findByIdAndDelete(id).exec();
  }
}
