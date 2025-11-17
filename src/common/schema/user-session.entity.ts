import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './baseEntity';
import { User } from './user.entity';

@Entity('user_sessions')
export class UserSession extends BaseEntity {
  @Column()
  user_id: string;

  @Column('text')
  token: string;

  @Column({ length: 45 })
  ip_address: string;

  @Column('jsonb', { nullable: true })
  device_info: any;

  @Column('timestamp')
  expires_at: Date;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
