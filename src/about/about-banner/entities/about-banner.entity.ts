import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type AboutBannerDocument = AboutBanner & Document;

@Schema()
export class AboutBanner {
  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'Media', required: true })
  @ApiProperty({ type: String, description: 'Media ID' })
  image: Types.ObjectId;
}

export const AboutBannerSchema = SchemaFactory.createForClass(AboutBanner);
