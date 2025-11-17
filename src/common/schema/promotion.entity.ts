// src/entities/promotion.entity.ts
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Product } from './product.entity';
import { Category } from './category.entity';
import { BaseEntity } from './baseEntity';

@Entity('promotions')
export class Promotion extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({
    type: 'enum',
    enum: ['sale', 'flash_sale', 'bundle'],
  })
  type: 'sale' | 'flash_sale' | 'bundle';

  @Column({
    type: 'enum',
    enum: ['percent', 'fixed'],
  })
  discount_type: 'percent' | 'fixed';

  @Column('decimal', { precision: 10, scale: 2 })
  discount_value: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  min_order_value: number;

  @Column('timestamp')
  start_date: Date;

  @Column('timestamp')
  end_date: Date;

  @Column('bigint', { array: true, nullable: true })
  applicable_stores: number[];

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(() => Product)
  @JoinTable({
    name: 'product_promotions',
    joinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];

  @ManyToMany(() => Category)
  @JoinTable({
    name: 'category_promotions',
    joinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
