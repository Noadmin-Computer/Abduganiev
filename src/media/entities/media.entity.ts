import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema()
export class Media {
  @Prop({ required: true })
  @ApiProperty()
  image: string;

  @Prop({ required: false })
  @ApiProperty()
  path: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
