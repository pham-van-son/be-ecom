import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'inventory_logs', timestamps: true })
export class InventoryLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'ProductVariant', required: true })
  variant_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Store', default: null })
  store_id: Types.ObjectId;

  @Prop({ required: true })
  quantity_change: number;

  @Prop({ required: true, maxlength: 255 })
  reason: string;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  user_id: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const InventoryLogSchema = SchemaFactory.createForClass(InventoryLog);
