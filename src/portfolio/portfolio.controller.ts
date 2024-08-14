import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-strategy.guard';
import { PaginationDto } from 'src/pagination/dto/pagination.dto';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { SearchPortfolioDto } from './dto/search-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfolioService } from './portfolio.service';

@ApiBearerAuth('access-token')
@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Portfolio',
  })
  @Post()
  async create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return await this.portfolioService.create(createPortfolioDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Portfolio',
  })
  @Get()
  @ApiQuery({ name: 'title', required: false, description: 'Search by title' })
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
  async findAll(@Query() query: SearchPortfolioDto & PaginationDto) {
    return this.portfolioService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Portfolio by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.portfolioService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update Portfolio by id',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return await this.portfolioService.update(id, updatePortfolioDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete Portfolio by id ',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.portfolioService.remove(id);
  }
}
