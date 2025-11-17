// src/entities/store-inventory.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Store } from './store.entity';
import { ProductVariant } from './product-variant.entity';
import { BaseEntity } from './baseEntity';

@Entity('store_inventories')
export class StoreInventory extends BaseEntity {
  @Column()
  store_id: number;

  @Column()
  variant_id: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_updated: Date;

  @ManyToOne(() => Store, { eager: false })
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @ManyToOne(() => ProductVariant, { eager: false })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;
}
