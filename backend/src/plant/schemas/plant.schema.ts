import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Plant extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
