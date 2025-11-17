// src/entities/order.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CustomerAccount } from './customer-account.entity';
import { Address } from './address.entity';
import { Store } from './store.entity';
import { OrderItem } from './order-item.entity';
import { BaseEntity } from './baseEntity';

@Entity('orders')
export class Order extends BaseEntity {
  @Column({ nullable: true })
  customer_account_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discount_applied: number;

  @Column({ default: false })
  is_gift: boolean;

  @Column('text', { nullable: true })
  gift_message: string;

  @Column('jsonb', { nullable: true })
  gift_recipient_info: any;

  @Column()
  shipping_address_id: number;

  @Column({ length: 50 })
  payment_method: string;

  @Column({
    type: 'enum',
    enum: ['paid', 'pending'],
    default: 'pending',
  })
  payment_status: 'paid' | 'pending';

  @Column({ nullable: true })
  store_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => CustomerAccount, { eager: false, nullable: true })
  @JoinColumn({ name: 'customer_account_id' })
  customer_account: CustomerAccount;

  @ManyToOne(() => Address, { eager: false })
  @JoinColumn({ name: 'shipping_address_id' })
  shipping_address: Address;

  @ManyToOne(() => Store, { eager: false, nullable: true })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}
