import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'product_variants', timestamps: true })
export class ProductVariant extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;

  @Prop({ maxlength: 50, default: null })
  size: string;

  @Prop({ maxlength: 50, default: null })
  color: string;

  @Prop({ type: Number, default: 0 })
  additional_price: number;

  @Prop({ default: 0 })
  stock_quantity: number;

  @Prop({ required: true, unique: true, maxlength: 50 })
  sku: string;

  @Prop({ type: Object, default: null })
  images: any;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const ProductVariantSchema =
  SchemaFactory.createForClass(ProductVariant);
