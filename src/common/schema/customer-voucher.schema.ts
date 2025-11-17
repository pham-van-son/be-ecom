import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'customer_vouchers', timestamps: true })
export class CustomerVoucher extends Document {
  @Prop({ type: Types.ObjectId, ref: 'CustomerAccount', required: true })
  customer_account_id: Types.ObjectId;

  @Prop({ required: true, unique: true, maxlength: 50 })
  code: string;

  @Prop({ type: String, enum: ['percent', 'fixed'], required: true })
  discount_type: 'percent' | 'fixed';

  @Prop({ required: true, type: Number })
  discount_value: number;

  @Prop({ required: true, type: Date })
  expires_at: Date;

  @Prop({ type: Date, default: null })
  used_at: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const CustomerVoucherSchema =
  SchemaFactory.createForClass(CustomerVoucher);
