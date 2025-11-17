import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'customer_profiles', timestamps: true })
export class CustomerProfile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'CustomerAccount', required: true })
  customer_account_id: Types.ObjectId;

  @Prop({ required: true, maxlength: 255 })
  full_name: string;

  @Prop({ required: true, maxlength: 20 })
  phone: string;

  @Prop({ type: Date, default: null })
  birthday: Date;

  @Prop({ type: String, enum: ['male', 'female', 'other'], default: null })
  gender: 'male' | 'female' | 'other';

  @Prop({ type: Types.ObjectId, ref: 'Address', default: null })
  default_address_id: Types.ObjectId;

  @Prop({ type: Object, default: null })
  preferences: any;

  @Prop()
  avatar?: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const CustomerProfileSchema =
  SchemaFactory.createForClass(CustomerProfile);
