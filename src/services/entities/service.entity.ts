import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  @Prop({ type: [String], required: true })
  @ApiProperty({ type: [String] })
  title: string[];

  @Prop({ type: [String], required: true })
  @ApiProperty({ type: [String] })
  text: string[];

  @Prop({ type: Types.ObjectId, ref: 'Media', required: false })
  @ApiProperty({ type: String, description: 'Media ID' })
  image?: Types.ObjectId;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
