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
import { CreateWhoWeDto } from './dto/create-who-we.dto';
import { UpdateWhoWeDto } from './dto/update-who-we.dto';
import { WhoWeService } from './who-we.service';

@ApiBearerAuth('access-token')
@ApiTags('Who-We')
@Controller('who')
export class WhoWeController {
  constructor(private readonly whoWeService: WhoWeService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Who-We',
  })
  @Post()
  create(@Body() createWhoWeDto: CreateWhoWeDto) {
    return this.whoWeService.create(createWhoWeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Who-We',
  })
  @Get()
  findAll() {
    return this.whoWeService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Who-We by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whoWeService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update Who-We by ID',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhoWeDto: UpdateWhoWeDto) {
    return this.whoWeService.update(id, updateWhoWeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete Who-We by ID',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whoWeService.remove(id);
  }
}
