import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { CustomerProfile } from './customer-profile.entity';

@Entity('addresses')
export class Address extends BaseEntity {
  @Column()
  customer_profile_id: number;

  @Column({ length: 255 })
  street: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  province: string;

  @Column({ length: 100, default: 'Vietnam' })
  country: string;

  @Column({ length: 20, nullable: true })
  zip_code: string;

  @Column({ default: false })
  is_default: boolean;

  @Column({ length: 255, nullable: true })
  recipient_name: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @ManyToOne(() => CustomerProfile, (profile) => profile.addresses, {
    eager: false,
  })
  @JoinColumn({ name: 'customer_profile_id' })
  customer_profile: CustomerProfile;
}
