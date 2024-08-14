import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { unlinkSync } from 'fs';
import { diskStorage } from 'multer';
import { join, extname as pathExtname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-strategy.guard';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaService } from './media.service';

@ApiBearerAuth('access-token')
@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Upload image' })
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = pathExtname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(
          pathExtname(file.originalname).toLowerCase(),
        );
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
          return callback(null, true);
        }
        callback(
          new Error('Only JPEG, PNG, and JPG files are allowed!'),
          false,
        );
      },
      limits: {
        fileSize: 1 * 1024 * 1024, // 1 MB
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const newMedia = {
      image: file.originalname, // Устанавливаем image автоматически
      path: `/uploads/${file.filename}`, // Устанавливаем path автоматически
    };

    return this.mediaService.create(newMedia);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get all media',
  })
  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get media by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update media by id',
  })
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = pathExtname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(
          pathExtname(file.originalname).toLowerCase(),
        );
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
          return callback(null, true);
        }
        callback(
          new Error('Only JPEG, PNG, and JPG files are allowed!'),
          false,
        );
      },
      limits: {
        fileSize: 1 * 1024 * 1024,
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        updateMediaDto: {
          type: 'object',
          properties: {},
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    const oldMedia = await this.mediaService.findOne(id);
    if (oldMedia && oldMedia.path) {
      try {
        // Delete the old file
        unlinkSync(
          join(
            __dirname,
            '..',
            '..',
            'uploads',
            oldMedia.path.split('/').pop(),
          ),
        );
      } catch (err) {
        throw new HttpException('Old file not found', HttpStatus.NOT_FOUND);
      }
    }

    const filePath = file ? `/uploads/${file.filename}` : oldMedia.path;
    const updatedMediaDto = {
      ...updateMediaDto,
      ...(file ? { image: file.originalname, path: filePath } : {}),
    };

    return this.mediaService.update(id, updatedMediaDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete media by id',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const media = await this.mediaService.findOne(id);
    if (media && media.path) {
      try {
        // Delete the file
        unlinkSync(
          join(__dirname, '..', '..', 'uploads', media.path.split('/').pop()),
        );
      } catch (err) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND);
      }
    }
    return this.mediaService.remove(id);
  }
}
