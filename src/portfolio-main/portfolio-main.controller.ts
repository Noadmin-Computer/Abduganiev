import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-strategy.guard';
import { CreatePortfolioMainDto } from './dto/create-portfolio-main.dto';
import { UpdatePortfolioMainDto } from './dto/update-portfolio-main.dto';
import { PortfolioMainService } from './portfolio-main.service';

@ApiBearerAuth('access-token')
@ApiTags('Portfolio-main')
@Controller('portfolio/main')
export class PortfolioMainController {
  constructor(private readonly portfolioMainService: PortfolioMainService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Banner',
  })
  @Post()
  async create(@Body() createPortfolioMainDto: CreatePortfolioMainDto) {
    return await this.portfolioMainService.create(createPortfolioMainDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Banner',
  })
  @Get()
  findAll() {
    return this.portfolioMainService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Banner by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.portfolioMainService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update Banner id',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePortfolioMainDto: UpdatePortfolioMainDto,
  ) {
    return await this.portfolioMainService.update(id, updatePortfolioMainDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete Banner id',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.portfolioMainService.remove(id);
  }
}
