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

  @Column()
  board_id: string;

  @Column({ type: 'int' }) // Ensure correct type
  food_id: number;

  @Column({ type: 'int' }) // Ensure correct type
  nutrient_id: number;

  @ManyToOne(() => foodModel, (food) => food.foodBoards)
  @JoinColumn({ name: 'food_id' }) // Foreign key reference
  food: foodModel;

  @ManyToOne(() => nutrientModel, (nutrient) => nutrient.foodBoards)
  @JoinColumn({ name: 'nutrient_id' }) // Foreign key reference
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
