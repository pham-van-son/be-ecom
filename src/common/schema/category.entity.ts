// src/entities/category.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('categories')
export class Category extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100 })
  slug: string;

  @Column({ nullable: true })
  parent_id: number;

  @Column('text', { nullable: true })
  description: string;

  @Column({ length: 255, nullable: true })
  image_url: string;

  @Column({ default: 0 })
  level: number;

  @ManyToOne(() => Category, { eager: false, nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];
}
