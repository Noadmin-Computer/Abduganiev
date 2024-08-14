import { PartialType } from '@nestjs/swagger';
import { CreatePortfolioMainDto } from './create-portfolio-main.dto';

export class UpdatePortfolioMainDto extends PartialType(CreatePortfolioMainDto) {}
