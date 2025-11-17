// src/entities/voucher.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('vouchers')
export class Voucher extends BaseEntity {
  @Column({ unique: true, length: 50 })
  code: string;

  @Column({
    type: 'enum',
    enum: ['percent', 'fixed'],
  })
  discount_type: 'percent' | 'fixed';

  @Column('decimal', { precision: 10, scale: 2 })
  discount_value: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  min_order_value: number;

  @Column({ nullable: true })
  max_uses: number;

  @Column({ default: 0 })
  uses_count: number;

  @Column('timestamp')
  expires_at: Date;
}
