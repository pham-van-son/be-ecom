import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'roles', timestamps: true })
export class Role extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  code: string;

  @Prop({ type: String, default: null })
  description?: string;

  @Prop({ type: Object, default: null })
  permissions: any;

  @Prop({ type: Types.ObjectId, ref: 'Role', default: null })
  parent_role_id: Types.ObjectId;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
