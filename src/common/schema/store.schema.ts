import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'stores', timestamps: true })
export class Store extends Document {
  @Prop({ required: true, maxlength: 255 })
  name: string;

  @Prop({ unique: true, required: true })
  code: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, maxlength: 20 })
  phone: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  manager_user_id: Types.ObjectId;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
