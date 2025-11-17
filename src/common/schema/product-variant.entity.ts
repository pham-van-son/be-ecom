// src/entities/product-variant.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from './baseEntity';

@Entity('product_variants')
export class ProductVariant extends BaseEntity {
  @Column()
  product_id: number;

  @Column({ length: 50, nullable: true })
  size: string;

  @Column({ length: 50, nullable: true })
  color: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  additional_price: number;

  @Column({ default: 0 })
  stock_quantity: number;

  @Column({ unique: true, length: 50 })
  sku: string;

  @Column('jsonb', { nullable: true })
  images: any;

  @ManyToOne(() => Product, (product) => product.variants, { eager: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
