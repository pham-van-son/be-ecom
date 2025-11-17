import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'user_sessions', timestamps: true })
export class UserSession extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;

  @Prop({ required: true, type: String })
  token: string;

  @Prop({ required: true, maxlength: 45 })
  ip_address: string;

  @Prop({ type: Object, default: null })
  device_info: any;

  @Prop({ required: true, type: Date })
  expires_at: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const UserSessionSchema = SchemaFactory.createForClass(UserSession);
