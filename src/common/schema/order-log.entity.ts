// src/entities/order-log.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { User } from './user.entity';
import { BaseEntity } from './baseEntity';

@Entity('order_logs')
export class OrderLog extends BaseEntity {
  @Column()
  order_id: number;

  @Column({ length: 50 })
  status_from: string;

  @Column({ length: 50 })
  status_to: string;

  @Column('text', { nullable: true })
  note: string;

  @Column({ nullable: true })
  user_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Order, { eager: false })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => User, { eager: false, nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
