// src/entities/cart.entity.ts
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CustomerAccount } from './customer-account.entity';
import { CartItem } from './cart-item.entity';
import { BaseEntity } from './baseEntity';

@Entity('carts')
export class Cart extends BaseEntity {
  // Nếu có khách đăng nhập
  @Column({ nullable: true })
  customer_account_id: number;

  // Nếu là guest (chưa login) - dùng token từ FE (localStorage hoặc cookie)
  @Column({ length: 255, nullable: true })
  guest_token: string;

  // Tổng tiền tạm tính (có thể tính realtime, nhưng lưu để tối ưu)
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total_amount: number;

  // Số lượng sản phẩm trong giỏ
  @Column({ default: 0 })
  total_items: number;

  // Relations
  @ManyToOne(() => CustomerAccount, { eager: false, nullable: true })
  @JoinColumn({ name: 'customer_account_id' })
  customer_account: CustomerAccount;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items: CartItem[];
}
