import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'product_attributes', timestamps: true })
export class ProductAttribute extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product_id: Types.ObjectId;

  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, maxlength: 255 })
  value: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const ProductAttributeSchema =
  SchemaFactory.createForClass(ProductAttribute);
