import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type AboutWhyDocument = AboutWhy & Document;

@Schema()
export class AboutWhy {
  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'Media', required: true })
  @ApiProperty({ type: String, description: 'Media ID' })
  image: Types.ObjectId;

  @Prop({ type: [String], required: true })
  @ApiProperty({ type: [String] })
  sub_text: string[];
}

export const AboutWhySchema = SchemaFactory.createForClass(AboutWhy);
