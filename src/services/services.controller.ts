import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-strategy.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@ApiBearerAuth('access-token')
@ApiTags('Service')
@Controller('service')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Creates new service',
  })
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get all services',
  })
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get service by id ',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update service by id ',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete service by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
