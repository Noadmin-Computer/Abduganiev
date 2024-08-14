import { PartialType } from '@nestjs/swagger';
import { CreateMainServiceDto } from './create-main-service.dto';

export class UpdateMainServiceDto extends PartialType(CreateMainServiceDto) {}
