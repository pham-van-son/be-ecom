import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export abstract class BaseSchema extends Document {
  @Prop({ type: String, default: () => new Date().toISOString() })
  createdAt: Date;

  @Prop({ type: String, default: () => new Date().toISOString() })
  updatedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}
