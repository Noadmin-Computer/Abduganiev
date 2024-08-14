import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type MainDocument = Main & Document;

@Schema()
export class Main {
  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  text: string;

  @Prop({ type: Types.ObjectId, ref: 'Media', required: false })
  @ApiProperty({ type: String, description: 'Media ID' })
  image?: Types.ObjectId;
}

export const MainSchema = SchemaFactory.createForClass(Main);
