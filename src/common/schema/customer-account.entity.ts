import { Column, Entity } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('customer_accounts')
export class CustomerAccount extends BaseEntity {
  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255, nullable: true })
  password: string;

  @Column({ default: 0 })
  points: number;

  @Column('text', { array: true, nullable: true })
  voucher_codes: string[];

  @Column({ default: false })
  is_verified: boolean;
}
