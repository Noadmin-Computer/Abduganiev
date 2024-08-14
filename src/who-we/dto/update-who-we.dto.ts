import { PartialType } from '@nestjs/swagger';
import { CreateWhoWeDto } from './create-who-we.dto';

export class UpdateWhoWeDto extends PartialType(CreateWhoWeDto) {}
