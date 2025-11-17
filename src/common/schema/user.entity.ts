import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { Role } from './role.entity';
import { Store } from './store.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    unique: true,
    nullable: true,
  })
  username: string;

  @Column({
    unique: true,
    nullable: true,
  })
  password: string;

  @Column()
  fullName?: string;

  @Column()
  role_id: string;

  @Column({ nullable: true })
  store_id: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  allowed_ips: string[];

  @ManyToOne(() => Role, { eager: false })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Store, { eager: false, nullable: true })
  @JoinColumn({ name: 'store_id' })
  store: Store;
}
