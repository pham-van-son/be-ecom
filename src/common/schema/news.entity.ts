// src/entities/news.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { NewsCategory } from './news-category.entity';
import { User } from './user.entity';
import { BaseEntity } from './baseEntity';

@Entity('news')
export class News extends BaseEntity {
  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column()
  category_id: number;

  @Column()
  author_user_id: number;

  @Column('jsonb', { nullable: true })
  images: any;

  @Column('timestamp', { nullable: true })
  publish_date: Date;

  @Column({ default: false })
  is_published: boolean;

  @ManyToOne(() => NewsCategory, { eager: false })
  @JoinColumn({ name: 'category_id' })
  category: NewsCategory;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({ name: 'author_user_id' })
  author: User;
}
