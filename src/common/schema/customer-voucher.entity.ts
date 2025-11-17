// src/entities/customer-voucher.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CustomerAccount } from './customer-account.entity';
import { BaseEntity } from './baseEntity';

@Entity('customer_vouchers')
export class CustomerVoucher extends BaseEntity {
  @Column()
  customer_account_id: number;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({
    type: 'enum',
    enum: ['percent', 'fixed'],
  })
  discount_type: 'percent' | 'fixed';

  @Column('decimal', { precision: 10, scale: 2 })
  discount_value: number;

  @Column('timestamp')
  expires_at: Date;

  @Column('timestamp', { nullable: true })
  used_at: Date;

  @ManyToOne(() => CustomerAccount, { eager: false })
  @JoinColumn({ name: 'customer_account_id' })
  customer_account: CustomerAccount;
}
