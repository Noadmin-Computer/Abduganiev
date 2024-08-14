import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PortfolioMainDocument = PortfolioMain & Document;

@Schema()
export class PortfolioMain {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;
}

export const PortfolioMainSchema = SchemaFactory.createForClass(PortfolioMain);
