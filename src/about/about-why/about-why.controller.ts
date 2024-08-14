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
import { AboutWhyService } from './about-why.service';
import { CreateAboutWhyDto } from './dto/create-about-why.dto';
import { UpdateAboutWhyDto } from './dto/update-about-why.dto';

@ApiBearerAuth('access-token')
@ApiTags('About-why')
@Controller('about/why')
export class AboutWhyController {
  constructor(private readonly aboutService: AboutWhyService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Why-Us',
  })
  @Post()
  create(@Body() createAboutWhyDto: CreateAboutWhyDto) {
    return this.aboutService.create(createAboutWhyDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Why-Us',
  })
  @Get()
  findAll() {
    return this.aboutService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get Why-Us by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update Why-Us by id',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAboutWhyDto: UpdateAboutWhyDto,
  ) {
    return this.aboutService.update(id, updateAboutWhyDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete Why-Us by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutService.remove(id);
  }
}
