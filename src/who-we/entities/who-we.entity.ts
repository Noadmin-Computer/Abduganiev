import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

export type WhoWeDocument = WhoWe & Document;

@Schema()
export class WhoWe {
  @Prop({ required: true })
  @ApiProperty()
  title: string;

  @Prop({ required: true })
  @ApiProperty()
  text: string;

  @Prop({ required: true })
  @ApiProperty()
  experience: string;

  @Prop({ required: true })
  @ApiProperty()
  projects: string;

  @Prop({ required: true })
  @ApiProperty()
  offices: string;

  @Prop({ type: Types.ObjectId, ref: 'Media', required: true })
  @ApiProperty({ type: String, description: 'Media ID' })
  image: Types.ObjectId;
}

export const WhoWeSchema = SchemaFactory.createForClass(WhoWe);
