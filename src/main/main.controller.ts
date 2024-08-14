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
import { CreateMainDto } from './dto/create-main.dto';
import { UpdateMainDto } from './dto/update-main.dto';
import { MainService } from './main.service';

@ApiTags('Main')
@ApiBearerAuth('access-token') // Ensure this matches the value in Swagger config
@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Main' })
  @Post()
  create(@Body() createMainDto: CreateMainDto) {
    return this.mainService.create(createMainDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Main' })
  @Get()
  findAll() {
    return this.mainService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Main by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update Main by id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMainDto: UpdateMainDto) {
    return this.mainService.update(id, updateMainDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete Main by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainService.remove(id);
  }
}
