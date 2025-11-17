import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CustomerAccount } from './customer-account.entity';
import { BaseEntity } from './baseEntity';
import { Address } from './address.entity';

@Entity('customer_profiles')
export class CustomerProfile extends BaseEntity {
  @Column()
  customer_account_id: number;

  @Column({ length: 255 })
  full_name: string;

  @Column({ length: 20 })
  phone: string;

  @Column('date', { nullable: true })
  birthday: Date;

  @Column({
    type: 'enum',
    enum: ['male', 'female', 'other'],
    nullable: true,
  })
  gender: 'male' | 'female' | 'other';

  @Column({ nullable: true })
  default_address_id: number;

  @Column('jsonb', { nullable: true })
  preferences: any;

  @Column()
  avatar?: string;

  @OneToOne(() => CustomerAccount, { eager: false })
  @JoinColumn({ name: 'customer_account_id' })
  customer_account: CustomerAccount;

  @OneToMany(() => Address, (address) => address.customer_profile)
  addresses: Address[];
}
