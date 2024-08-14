import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-strategy.guard';
import { PaginationDto } from '../../pagination/dto/pagination.dto';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { PartnersService } from './partners.service';

@ApiBearerAuth('access-token')
@ApiTags('Partner')
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Partners',
  })
  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnersService.create(createPartnerDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Partners',
  })
  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    schema: { default: 1 },
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    schema: { default: 5 },
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.partnersService.findAll(paginationDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Partner by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update Partner by id',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.update(id, updatePartnerDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete Partner by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnersService.remove(id);
  }
}
