import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IFood } from '../interface/food.interface';
import { nutrientModel } from 'src/nutrient/entity/nutrient.entity';
import { FoodBoardModel } from './foodBoard.entity';

@Entity('food')
export class foodModel implements IFood {
  @PrimaryGeneratedColumn({ comment: '음식 ID' })
  food_id: number;

  @OneToMany(() => FoodBoardModel, (foodBoard) => foodBoard.food)
  foodBoards: FoodBoardModel[];

  @OneToOne(() => nutrientModel, (nutrient) => nutrient.food)
  nutreint: nutrientModel;

  @Column({ type: 'varchar', length: '255', comment: '음식 이미지 url' })
  food_imageurl: string;

  @Column({ type: 'varchar', length: '20', comment: '음식 이름' })
  food_name: string;

  @Column({ type: 'varchar', length: '50', comment: '음식 설명' })
  food_notice: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
