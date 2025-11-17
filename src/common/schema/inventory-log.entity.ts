// src/entities/inventory-log.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductVariant } from './product-variant.entity';
import { Store } from './store.entity';
import { User } from './user.entity';
import { BaseEntity } from './baseEntity';

@Entity('inventory_logs')
export class InventoryLog extends BaseEntity {
  @Column()
  variant_id: number;

  @Column({ nullable: true })
  store_id: number;

  @Column()
  quantity_change: number;

  @Column({ length: 255 })
  reason: string;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => ProductVariant, { eager: false })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @ManyToOne(() => Store, { eager: false, nullable: true })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @ManyToOne(() => User, { eager: false, nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
