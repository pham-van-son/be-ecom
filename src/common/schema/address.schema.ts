import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'addresses', timestamps: true })
export class Address extends Document {
  @Prop({ type: Types.ObjectId, ref: 'CustomerProfile', required: true })
  customer_profile_id: Types.ObjectId;

  @Prop({ required: true, maxlength: 255 })
  street: string;

  @Prop({ required: true, maxlength: 100 })
  city: string;

  @Prop({ required: true, maxlength: 100 })
  province: string;

  @Prop({ maxlength: 100, default: 'Vietnam' })
  country: string;

  @Prop({ maxlength: 20, default: null })
  zip_code: string;

  @Prop({ default: false })
  is_default: boolean;

  @Prop({ maxlength: 255, default: null })
  recipient_name: string;

  @Prop({ maxlength: 20, default: null })
  phone: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
