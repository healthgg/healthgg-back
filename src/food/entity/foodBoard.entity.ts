import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MealEnum } from '../enum/meal.enum';
import { foodModel } from './food.entity';
import { nutrientModel } from 'src/nutrient/entity/nutrient.entity';

@Entity('food_board')
export class FoodBoardModel {
  @PrimaryGeneratedColumn()
  food_Board_id: number;

  @Column({ type: 'varchar' })
  board_id: string;

  @Column({ type: 'int' }) e;
  food_id: number;

  @Column({ type: 'int' })
  nutrient_id: number;

  @ManyToOne(() => foodModel, (food) => food.foodBoards)
  @JoinColumn({ name: 'food_id' })
  food: foodModel;

  @ManyToOne(() => nutrientModel, (nutrient) => nutrient.foodBoards)
  @JoinColumn({ name: 'nutrient_id' })
  nutrient: nutrientModel;

  @Column({
    type: 'enum',
    enum: Object.values(MealEnum),
    comment: '식사시간',
  })
  meal: MealEnum;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
