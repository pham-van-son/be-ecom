// src/entities/cart-item.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { ProductVariant } from './product-variant.entity';
import { BaseEntity } from './baseEntity';

@Entity('cart_items')
export class CartItem extends BaseEntity {
  @Column()
  cart_id: number;

  @Column()
  variant_id: number;

  @Column()
  quantity: number;

  // Giá tại thời điểm thêm vào giỏ (để tránh thay đổi giá ảnh hưởng)
  @Column('decimal', { precision: 10, scale: 2 })
  price_at_add: number;

  // Relations
  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => ProductVariant, { eager: true })
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;
}
