import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column('text', {
    nullable: true,
  })
  description?: string;

  @Column('jsonb', {
    nullable: true,
  })
  permissions: any;

  @Column({ nullable: true })
  parent_role_id: number;

  @ManyToOne(() => Role, {
    eager: false,
    nullable: true,
  })
  @JoinColumn({ name: 'parent_role_id' })
  parent_role: Role;
}
