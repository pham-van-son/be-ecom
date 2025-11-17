import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'carts', timestamps: true })
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'CustomerAccount', default: null })
  customer_account_id: Types.ObjectId;

  @Prop({ maxlength: 255, default: null })
  guest_token: string;

  @Prop({ type: Number, default: 0 })
  total_amount: number;

  @Prop({ default: 0 })
  total_items: number;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
