// partner.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { Media } from 'src/media/entities/media.entity';

export type PartnerDocument = Partner & Document;

@Schema()
export class Partner {
  @Prop({ type: Types.ObjectId, ref: 'Media', required: true })
  @ApiProperty({
    type: String,
    description: 'Media ID',
  })
  image: Types.ObjectId;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);
