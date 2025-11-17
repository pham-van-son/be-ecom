import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'news', timestamps: true })
export class News extends Document {
  @Prop({ required: true, maxlength: 255 })
  title: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'NewsCategory', required: true })
  category_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  author_user_id: Types.ObjectId;

  @Prop({ type: Object, default: null })
  images: any;

  @Prop({ type: Date, default: null })
  publish_date: Date;

  @Prop({ default: false })
  is_published: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
