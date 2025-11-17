import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'order_items', timestamps: true })
export class OrderItem extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ProductVariant', required: true })
  variant_id: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, type: Number })
  price_at_purchase: number;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
