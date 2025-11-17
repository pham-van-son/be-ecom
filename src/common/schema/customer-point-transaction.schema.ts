import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'customer_point_transactions', timestamps: true })
export class CustomerPointTransaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'CustomerAccount', required: true })
  customer_account_id: Types.ObjectId;

  @Prop({ required: true })
  points_change: number;

  @Prop({ required: true, maxlength: 255 })
  reason: string;

  @Prop({ type: Types.ObjectId, ref: 'Order', default: null })
  order_id: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const CustomerPointTransactionSchema = SchemaFactory.createForClass(
  CustomerPointTransaction,
);
