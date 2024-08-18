import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IFood } from '../interface/food.interface';
import { nutrientModel } from 'src/nutrient/entity/nutrient.entity';

@Entity('food')
export class foodModel implements IFood {
  @PrimaryGeneratedColumn({ comment: '음식 ID' })
  food_id: number;

  @Column({ type: 'varchar', length: '255', comment: '음식 이미지 url' })
  food_imageurl: string;

  @Column({ type: 'varchar', length: '20', comment: '음식 이름' })
  food_name: string;

  @Column({ type: 'varchar', length: '50', comment: '음식 설명' })
  food_notice: string;

  @Column({ type: 'varchar', length: '50', comment: '음식 게시글 고유값' })
  post_id: string;

  @OneToOne(() => nutrientModel, (nutrient) => nutrient.food)
  @JoinColumn({ name: 'nutrient_id' })
  nutrient: nutrientModel;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
