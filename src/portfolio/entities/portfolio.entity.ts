// portfolio.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PortfolioDocument = Portfolio & Document;

@Schema()
export class Portfolio {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'Media', required: true })
  image: Types.ObjectId;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
