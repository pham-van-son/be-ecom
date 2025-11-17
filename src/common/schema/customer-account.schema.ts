import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'customer_accounts', timestamps: true })
export class CustomerAccount extends Document {
  @Prop({ required: true, unique: true, maxlength: 255 })
  email: string;

  @Prop({ maxlength: 255, default: null })
  password: string;

  @Prop({ default: 0 })
  points: number;

  @Prop({ type: [String], default: [] })
  voucher_codes: string[];

  @Prop({ default: false })
  is_verified: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt?: Date;

  @Prop({ default: 'active' })
  status: string;
}

export const CustomerAccountSchema =
  SchemaFactory.createForClass(CustomerAccount);
