import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop({ required: true })
  @ApiProperty()
  work_mode: string;

  @Prop({ required: true })
  @ApiProperty()
  phone_number: string;

  @Prop({ required: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  @ApiProperty()
  address: string;

  @Prop({ required: true })
  @ApiProperty()
  telegram: string;

  @Prop({ required: true })
  @ApiProperty()
  linkedin: string;

  @Prop({ required: true })
  @ApiProperty()
  youtube: string;

  @Prop({ required: true })
  @ApiProperty()
  instagram: string;

  @Prop({ required: true })
  @ApiProperty()
  facebook: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
