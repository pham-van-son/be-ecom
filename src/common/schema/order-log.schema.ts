import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'order_logs', timestamps: true })
export class OrderLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order_id: Types.ObjectId;

  @Prop({ required: true, maxlength: 50 })
  status_from: string;

  @Prop({ required: true, maxlength: 50 })
  status_to: string;

  @Prop({ type: String, default: null })
  note: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  user_id: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const OrderLogSchema = SchemaFactory.createForClass(OrderLog);
