import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'roles', timestamps: true })
export class Role extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true, default: () => uuidv4() })
  code: string;

  @Prop({ type: String, default: null })
  description?: string;

  @Prop({ type: Types.ObjectId, ref: 'Role', default: null })
  parent_role_id?: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.index({ code: 1 });
