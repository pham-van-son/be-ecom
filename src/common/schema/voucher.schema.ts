import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'vouchers', timestamps: true })
export class Voucher extends Document {
  @Prop({ required: true, unique: true, maxlength: 50 })
  code: string;

  @Prop({ type: String, enum: ['percent', 'fixed'], required: true })
  discount_type: 'percent' | 'fixed';

  @Prop({ required: true, type: Number })
  discount_value: number;

  @Prop({ type: Number, default: null })
  min_order_value: number;

  @Prop({ default: null })
  max_uses: number;

  @Prop({ default: 0 })
  uses_count: number;

  @Prop({ required: true, type: Date })
  expires_at: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);
