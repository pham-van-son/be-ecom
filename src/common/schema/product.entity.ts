// src/entities/product.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { ProductVariant } from './product-variant.entity';
import { BaseEntity } from './baseEntity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column()
  category_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  base_price: number;

  @Column({ unique: true, length: 50 })
  sku: string;

  @Column('jsonb', { nullable: true })
  images: any;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Category, { eager: false })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];
}
