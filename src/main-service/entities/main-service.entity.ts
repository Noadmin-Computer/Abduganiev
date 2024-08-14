import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type MainServiceDocument = MainService & Document;

@Schema()
export class MainService {
  @Prop({ type: Types.ObjectId, ref: 'Media', required: true })
  @ApiProperty({ type: String, description: 'Media ID' })
  image: Types.ObjectId;

  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  text: string;
}

export const MainServiceSchema = SchemaFactory.createForClass(MainService);
