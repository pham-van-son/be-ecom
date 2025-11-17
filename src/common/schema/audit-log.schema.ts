import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'audit_logs', timestamps: true })
export class AuditLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  user_id: Types.ObjectId;

  @Prop({ required: true, maxlength: 100 })
  action: string;

  @Prop({ required: true })
  entity_id: number;

  @Prop({ type: Object, default: null })
  old_value: any;

  @Prop({ type: Object, default: null })
  new_value: any;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
