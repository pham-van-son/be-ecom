import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'categories', timestamps: true })
export class Category extends Document {
  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: true, unique: true, maxlength: 100 })
  slug: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', default: null })
  parent_id: Types.ObjectId;

  @Prop({ type: String, default: null })
  description: string;

  @Prop({ maxlength: 255, default: null })
  image_url: string;

  @Prop({ default: 0 })
  level: number;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
