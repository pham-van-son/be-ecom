import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { User } from './user.entity';

@Entity('stores')
export class Store extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column('text')
  address: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ nullable: true })
  manager_user_id: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => User, { eager: false, nullable: true })
  @JoinColumn({ name: 'manager_user_id' })
  manager: User;

  @OneToMany(() => User, (user) => user.store)
  users: User[];
}
