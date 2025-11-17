// src/entities/order-item.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { ProductVariant } from './product-variant.entity';
import { BaseEntity } from './baseEntity';

@Entity('order_items')
export class OrderItem extends BaseEntity {
  @Column()
  order_id: number;

  @Column()
  variant_id: number;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price_at_purchase: number;

  @ManyToOne(() => Order, (order) => order.items, { eager: false })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => ProductVariant, { eager: false })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;
}
