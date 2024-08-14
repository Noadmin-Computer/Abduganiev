import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-strategy.guard';
import { CreateMainServiceDto } from './dto/create-main-service.dto';
import { UpdateMainServiceDto } from './dto/update-main-service.dto';
import { MainServiceService } from './main-service.service';

@ApiBearerAuth('access-token')
@ApiTags('Main-Service')
@Controller('main/service')
export class MainServiceController {
  constructor(private readonly mainServiceService: MainServiceService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Banner',
  })
  @Post()
  async create(@Body() createMainServiceDto: CreateMainServiceDto) {
    try {
      return await this.mainServiceService.create(createMainServiceDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Banner',
  })
  @Get()
  async findAll() {
    try {
      return await this.mainServiceService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Banner by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.mainServiceService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update Banner by id',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMainServiceDto: UpdateMainServiceDto,
  ) {
    try {
      return await this.mainServiceService.update(id, updateMainServiceDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete Banner by id',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.mainServiceService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
