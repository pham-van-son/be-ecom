import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'orders', timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'CustomerAccount', default: null })
  customer_account_id: Types.ObjectId;

  @Prop({ required: true, type: Number })
  total_amount: number;

  @Prop({ type: Number, default: 0 })
  discount_applied: number;

  @Prop({ default: false })
  is_gift: boolean;

  @Prop({ type: String, default: null })
  gift_message: string;

  @Prop({ type: Object, default: null })
  gift_recipient_info: any;

  @Prop({ type: Types.ObjectId, ref: 'Address', required: true })
  shipping_address_id: Types.ObjectId;

  @Prop({ required: true, maxlength: 50 })
  payment_method: string;

  @Prop({ type: String, enum: ['paid', 'pending'], default: 'pending' })
  payment_status: 'paid' | 'pending';

  @Prop({ type: Types.ObjectId, ref: 'Store', default: null })
  store_id: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
