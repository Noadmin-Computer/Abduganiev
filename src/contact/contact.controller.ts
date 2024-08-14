import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-strategy.guard';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiBearerAuth('access-token')
@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create contact',
  })
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get contacts',
  })
  @Get()
  findAll() {
    return this.contactService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get contact by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update contact by id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete contact by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
