import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  fullName?: string;

  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  role_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Store', default: null })
  store_id?: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  allowed_ips: string[];

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ username: 1 });
