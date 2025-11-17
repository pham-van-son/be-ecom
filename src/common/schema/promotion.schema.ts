import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'promotions', timestamps: true })
export class Promotion extends Document {
  @Prop({ required: true, maxlength: 255 })
  name: string;

  @Prop({
    type: String,
    enum: ['sale', 'flash_sale', 'bundle'],
    required: true,
  })
  type: 'sale' | 'flash_sale' | 'bundle';

  @Prop({ type: String, enum: ['percent', 'fixed'], required: true })
  discount_type: 'percent' | 'fixed';

  @Prop({ required: true, type: Number })
  discount_value: number;

  @Prop({ type: Number, default: null })
  min_order_value: number;

  @Prop({ required: true, type: Date })
  start_date: Date;

  @Prop({ required: true, type: Date })
  end_date: Date;

  @Prop({ type: [Types.ObjectId], default: [] })
  applicable_stores: Types.ObjectId[];

  @Prop({ default: true })
  is_active: boolean;

  // Many-to-many relationships stored as arrays of ObjectIds
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  products: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], default: [] })
  categories: Types.ObjectId[];

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
