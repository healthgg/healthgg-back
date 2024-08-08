import { foodModel } from 'src/food/entity/food.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { INutrient } from '../interface/nutrient.interface';

@Entity('nutrient')
export class nutrientModel implements INutrient {
  @PrimaryColumn({ comment: '영양소 ID' })
  nutrient_id: number;

  @OneToOne(() => foodModel, (food: foodModel) => food.food_id, {
    cascade: true,
  })
  @JoinColumn({ name: 'food_id' })
  food_id: foodModel;

  @Column({ type: 'varchar', length: '255', comment: '음식 칼로리' })
  calory: string;

  @Column({ type: 'varchar', length: '255', comment: '음식 단밸직' })
  protein: string;

  @Column({ type: 'varchar', length: '255', comment: '음식 탄수화물' })
  carbohydrate: string;

  @Column({ type: 'varchar', length: '255', comment: '음식 지방' })
  fat: string;

  @Column({ type: 'varchar', length: '255', comment: '총량' })
  amount: string;

  @Column({ type: 'varchar', length: '255', comment: '단위' })
  unit: string;
}
