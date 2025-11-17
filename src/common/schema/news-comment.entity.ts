// src/entities/news-comment.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { News } from './news.entity';
import { CustomerAccount } from './customer-account.entity';
import { BaseEntity } from './baseEntity';

@Entity('news_comments')
export class NewsComment extends BaseEntity {
  @Column()
  news_id: number;

  @Column({ nullable: true })
  customer_account_id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => News, { eager: false })
  @JoinColumn({ name: 'news_id' })
  news: News;

  @ManyToOne(() => CustomerAccount, { eager: false, nullable: true })
  @JoinColumn({ name: 'customer_account_id' })
  customer_account: CustomerAccount;
}
