import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document , Types } from 'mongoose';

export type PlantDocument = Plant & Document;

@Schema({ timestamps: true })
export class Plant {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  plantAge: number;

  @Prop({ required: true })
  image: string; // image path / url
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
