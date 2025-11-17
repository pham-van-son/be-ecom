// src/entities/product-attribute.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from './baseEntity';

@Entity('product_attributes')
export class ProductAttribute extends BaseEntity {
  @Column()
  product_id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  value: string;

  @ManyToOne(() => Product, { eager: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
