import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class BoardBaseModel {
  @Column({ comment: '게시글 ID' })
  board_id: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  sub_title: string;

  @Column({ type: 'varchar', length: 10000 })
  description: string;

  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
