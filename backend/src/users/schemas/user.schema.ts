import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// Schema represents that this is MongoDB Schema
@Schema()
export class User {
  // Prop->Column
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}
// SchemaFactory used to create mongoose schema here
export const UserSchema = SchemaFactory.createForClass(User);
