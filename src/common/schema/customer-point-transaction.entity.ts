import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { CustomerAccount } from './customer-account.entity';
import { Order } from './order.entity';

@Entity('customer_point_transactions')
export class CustomerPointTransaction extends BaseEntity {
  @Column()
  customer_account_id: number;

  @Column()
  points_change: number;

  @Column({ length: 255 })
  reason: string;

  @Column({ nullable: true })
  order_id: number;

  @ManyToOne(() => CustomerAccount, { eager: false })
  @JoinColumn({ name: 'customer_account_id' })
  customer_account: CustomerAccount;

  @ManyToOne(() => Order, { eager: false, nullable: true })
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
