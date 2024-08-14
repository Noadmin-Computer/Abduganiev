import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'Media', required: true })
  @ApiProperty({ type: String, description: 'Media ID' })
  avatar: Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty()
  avatar_title: string;

  @Prop({ required: true })
  @ApiProperty()
  avatar_text: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
