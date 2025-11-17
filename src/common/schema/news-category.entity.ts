// src/entities/news-category.entity.ts
import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './baseEntity';

@Entity('news_categories')
export class NewsCategory extends BaseEntity {
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

  @ManyToOne(() => NewsCategory, { eager: false, nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: NewsCategory;

  @OneToMany(() => NewsCategory, (category) => category.parent)
  children: NewsCategory[];
}
