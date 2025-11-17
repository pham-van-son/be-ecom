import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'store_inventories', timestamps: true })
export class StoreInventory extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  store_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ProductVariant', required: true })
  variant_id: Types.ObjectId;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ type: Date, default: () => new Date() })
  last_updated: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const StoreInventorySchema =
  SchemaFactory.createForClass(StoreInventory);
