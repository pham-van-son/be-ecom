// src/entities/audit-log.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './baseEntity';

@Entity('audit_logs')
export class AuditLog extends BaseEntity {
  @Column({ nullable: true })
  user_id: number;

  @Column({ length: 100 })
  action: string;

  @Column()
  entity_id: number;

  @Column('jsonb', { nullable: true })
  old_value: any;

  @Column('jsonb', { nullable: true })
  new_value: any;

  @ManyToOne(() => User, { eager: false, nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
