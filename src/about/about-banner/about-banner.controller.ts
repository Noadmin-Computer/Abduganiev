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
import { AboutBannerService } from './about-banner.service';
import { CreateAboutBannerDto } from './dto/create-about-banner.dto';
import { UpdateAboutBannerDto } from './dto/update-about-banner.dto';

@ApiTags('About-banner')
@ApiBearerAuth('access-token')
@Controller('about/banner')
export class AboutBannerController {
  constructor(private readonly aboutService: AboutBannerService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Banner',
  })
  @Post()
  create(@Body() createAboutBannerDto: CreateAboutBannerDto) {
    return this.aboutService.create(createAboutBannerDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get banner',
  })
  @Get()
  findAll() {
    return this.aboutService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get banner by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update banner by id',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAboutBannerDto: UpdateAboutBannerDto,
  ) {
    return this.aboutService.update(id, updateAboutBannerDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete banner by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutService.remove(id);
  }
}
