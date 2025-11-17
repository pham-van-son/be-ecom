import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'cart_items', timestamps: true })
export class CartItem extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Cart', required: true })
  cart_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ProductVariant', required: true })
  variant_id: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, type: Number })
  price_at_add: number;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
