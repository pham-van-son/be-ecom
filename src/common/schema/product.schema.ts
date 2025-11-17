import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'products', timestamps: true })
export class Product extends Document {
  @Prop({ required: true, maxlength: 255 })
  name: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category_id: Types.ObjectId;

  @Prop({ required: true, type: Number })
  base_price: number;

  @Prop({ required: true, unique: true, maxlength: 50 })
  sku: string;

  @Prop({ type: Object, default: null })
  images: any;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
